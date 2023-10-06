import ERROR_CODES from "../constants/errorCodes.js";
import SUCCESS_CODES from "../constants/successCodes.js";

export const sendBadRequest = (res, message) => {
  return res.status(ERROR_CODES.BAD_REQUEST).json({ error: message });
};

export const sendNotFoundRequest = (res, message) => {
  return res.status(ERROR_CODES.NOT_FOUND).json({ error: message });
};

export const sendServerError = (res, message) => {
  return res.status(ERROR_CODES.SERVER_ERROR).json({ error: message });
};

export const sendNotAllowedRequest = (res, message) => {
  return res.status(ERROR_CODES.NOT_ALLOWED).json({ error: message });
}

export const sendOK = (res, message) => {
  res.status(SUCCESS_CODES.OK).json(message);
}

export const sendComplete = (res, message) => {
  res.status(SUCCESS_CODES.COMPLETE).json(message);
}