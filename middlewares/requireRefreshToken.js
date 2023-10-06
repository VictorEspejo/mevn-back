import jwt from "jsonwebtoken";

export const requireRefreshToken = async (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("No existe el token");
    const { uid } = await jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
    req.uid = uid;
    next();
  } catch (error) {
    res.status(401).json(error.message);
  }
};
