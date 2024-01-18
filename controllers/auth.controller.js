import { User } from "../models/User.js";
import { generateToken, generateRefreshToken } from "../utils/generateToken.js";
import {
  sendComplete,
  sendNotAllowedRequest, // Función para enviar una respuesta de solicitud no permitida
  sendOK, // Función para enviar una respuesta exitosa
  sendServerError, // Función para enviar una respuesta de error del servidor
} from "../utils/statusRequest.js";

// Controlador para iniciar sesión
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar usuario por email
    const user = await User.findOne({ email });
    // Si el usuario no existe, lanzar un error
    if (!user) throw { code: 10000 };
    // Comprobar si la contraseña es correcta utilizando la función comparePassword
    const isSamePass = await user.comparePassword(password);
    if (!isSamePass) throw { code: 10001 };
    // Generar un token JWT para el usuario
    const token = generateToken(user.id);
    console.log("TOKEN GENERADO: ", token.token);

    // Generar el token de actualización (refresh token) JWT y guardarlo en una cookie segura
    generateRefreshToken(user.id, res);

    return sendComplete(res, { token });
  } catch (error) {
    if (error.code === 10000)
      return sendNotAllowedRequest(res, "Usuario no registrado");
    if (error.code === 10001)
      return sendNotAllowedRequest(res, "La contraseña no coincide");
    return sendServerError(res, {
      error: "Error del servidor",
      code: error.code,
      msg: error.message,
    });
  }
};

// Controlador para registrar un nuevo usuario
export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Comprobar si el usuario ya está registrado
    if (await User.findOne({ email })) throw { code: 11000 };
    const user = new User({ email, password });
    await user.save();

    // Generar un token JWT para el usuario
    const token = generateToken(user.id);
    //console.log("TOKEN GENERADO: ", token.token);

    // Generar el token de actualización (refresh token) JWT y guardarlo en una cookie segura
    generateRefreshToken(user.id, res);
    return sendComplete(res, { token });
  } catch (error) {
    if (error.code === 11000) {
      return sendNotAllowedRequest(res, "Usuario ya registrado");
    } else {
      return sendServerError(res, {
        error: "Error del servidor",
        code: error.code,
        msg: error.message,
      });
    }
  }
};

// Controlador para refrescar el token de acceso
export const refreshToken = async (req, res) => {
  try {
    // Generar un nuevo token JWT utilizando el id del usuario
    const token = generateToken(req.uid);
    return sendComplete(res, { token });
  } catch (error) {
    return sendServerError(res, {
      error: "Error del servidor",
      code: error.code,
      msg: error.message,
    });
  }
};

// Controlador para cerrar sesión
export const logout = (req, res) => {
  // Limpiar la cookie que contiene el refresh token
  res.clearCookie("refreshToken");
  return sendOK(res, { ok: true });
};

// Controlador para obtener información del usuario
export const infoUser = async (req, res) => {
  try {
    // Utilizar findById para buscar al usuario por su id y devolver solo el email
    const user = await User.findById(req.uid).lean();
    return sendOK(res, { email: user.email });
  } catch (error) {
    return sendServerError(res, {
      error: "Error del servidor",
      code: error.code,
      msg: error.message,
    });
  }
};
