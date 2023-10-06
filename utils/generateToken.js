import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
  //segundos * minutos
  const expiresIn = 60 * 15;
  try {
    const token = jwt.sign({ uid }, process.env.JWT, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    throw new Error("Error al generar token");
  }
};


//GENERAMOS UN TOKEN DE REFRESCO QUE SE GUARDE EN UNA COOKIE SEGURA EN LAS PETICIONES
export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60; //1 hora
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODE === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    throw new Error(error);
  }
};
