import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";
import {
  sendBadRequest,
  sendComplete,
  sendNotAllowedRequest,
  sendNotFoundRequest,
  sendOK,
  sendServerError,
} from "../utils/statusRequest.js";

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid });
    res.json({ links });
  } catch (error) {
    return sendServerError(res, "Error de servidor");
  }
};

export const createLink = async (req, res) => {
  try {
    const { longLink, nanoLink } = req.body;
    let newNanoLink = "";
    if (nanoLink) {
      const linkWithNano = await Link.findOne({ nanoLink });
      if (linkWithNano.validate()) {
        return sendBadRequest(res, "El nanoLink ya existe");
      }
      newNanoLink = nanoLink;
    } else {
      newNanoLink = nanoid(6);
    }
    const link = new Link({ longLink, nanoLink: newNanoLink, uid: req.uid });
    const newLink = await link.save();
    sendComplete(res, newLink);
  } catch (error) {
    return sendServerError(res, "Error de servidor");
  }
};

export const getLink = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendBadRequest(res, "Error al recibir el ID");
    }

    const link = await Link.findById(id);

    if (!link) {
      return sendNotFoundRequest(res, "No existe el enlace");
    }

    //COMPROBAR QUE EL UID SEA EL DEL USUARIO QUE CONSULTA
    if (!link.uid.equals(req.uid))
      return sendNotAllowedRequest(res, "No está autorizado");

    sendOK(res, link);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return sendNotFoundRequest(res, "No existe el enlace");
    }

    return sendServerError(res, "Error de servidor");
  }
};

export const getNanoLink = async (req, res) => {
  try {
    const { nanoLink } = req.params;
    if (!nanoLink) {
      return sendBadRequest(res, "Error al recibir el nanoLink");
    }

    const link = await Link.findOne({ nanoLink });

    if (!link) {
      return sendNotFoundRequest(res, "No existe el enlace");
    }

    sendOK(res, { url: link.longLink });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return sendNotFoundRequest(res, "No existe el enlace");
    }
    console.log(error);
    return sendServerError(res, "Error de servidor");
  }
};

export const removeLink = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return sendBadRequest(res, "Error al recibir el ID");
    }

    const link = await Link.findById(id);

    if (!link) {
      return sendNotFoundRequest(res, "No existe el enlace");
    }

    //COMPROBAR QUE EL UID SEA EL DEL USUARIO QUE CONSULTA
    if (!link.uid.equals(req.uid))
      return sendNotAllowedRequest(res, "No está autorizado");

    //BORRA EL DOCUMENTO DE LA BASE DE DATOS
    await Link.findOneAndRemove({ _id: link.id });

    sendOK(res, { ok: true });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return sendNotFoundRequest(res, "No existe el enlace");
    }

    return sendServerError(res, error.message);
  }
};

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { longLink } = req.body;
    if (!id) {
      return sendBadRequest(res, "Error al recibir el ID");
    }

    const link = await Link.findById(id);

    if (!link) {
      return sendNotFoundRequest(res, "No existe el enlace");
    }

    //COMPROBAR QUE EL UID SEA EL DEL USUARIO QUE CONSULTA
    if (!link.uid.equals(req.uid))
      return sendNotAllowedRequest(res, "No está autorizado");

    //ACTUALIZA EL DOCUMENTO DE LA BASE DE DATOS
    await link.updateOne({ longLink });

    sendOK(res, { ok: true });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return sendNotFoundRequest(res, "No existe el enlace");
    }

    return sendServerError(res, error.message);
  }
};
