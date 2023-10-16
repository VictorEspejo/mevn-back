import jwt from "jsonwebtoken";
import { sendNotAllowedRequest } from "../utils/statusRequest";

export const requireRefreshToken = async (req, res, next) => {
  const refreshTokenCookie = req.cookies.refreshToken;
  if (!refreshTokenCookie) return sendNotAllowedRequest(res, "No existe el token");
  try {
    const { uid } = await jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    req.uid = uid;
    next();
  } catch (error) {
    sendNotAllowedRequest(res, error.message)
  }
};




