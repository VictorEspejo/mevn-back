import { User } from "../models/User.js";
import { generateToken, generateRefreshToken } from "../utils/generateToken.js";


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //COMPROBAMOS QUE EXISTA
    const user = await User.findOne({ email });
    //CONTROLAMOS ERROR
    if (!user) throw { code: 10000 };
    //CONTROLAMOS QUE LA CONTRASEÑA SEA CORRECTA AÑADIENDO LA FUNCION COMPARE
    const isSamePass = await user.comparePassword(password);
    if (!isSamePass) throw { code: 10001 };
    //GENERA TOKEN JWT
    const token = generateToken(user.id);
    console.log('TOKEN GENERADO: ', token.token);

    //GENERA EL REFRESH TOKEN JWT Y LO GUARDA POR COOKIE SEGURA
    generateRefreshToken(user.id, res);

    return res.status(201).json({ token });
  } catch (error) {
    if (error.code === 10000)
      return res.status(401).json({ error: "Usuario no registrado" });
    if (error.code === 10001)
      return res.status(401).json({ error: "La pass no coincide" });
    return res
      .status(500)
      .json({ error: "Error del servidor", code: error.code, msg: error.message });
  }
};

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    //alternativa buscando usuario registrado
    if (await User.findOne({ email })) throw { code: 11000 };
    const user = new User({ email, password });
    await user.save();

    const token = generateToken(user.id);
    console.log('TOKEN GENERADO: ', token.token);

    //GENERA EL REFRESH TOKEN JWT Y LO GUARDA POR COOKIE SEGURA
    generateRefreshToken(user.id, res);
    return res.json({token});
  } catch (error) {
    //alternativa por defecto
    if (error.code === 11000) {
      return res.status(401).json({ error: "User registered" });
    } else {
      return res.status(500).json({ error: "Error del servidor" });
    }
  }
};


export const refreshToken = async (req, res) => {
  try {
    const token = generateToken(req.uid);
    res.json({ ...token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}


export const logout = (req, res) => {
  res.clearCookie('refreshToken')
  res.json({ok: true});
}

export const infoUser = async (req, res) => {
  try {
    //Lean devuelve un objeto simple por lo que la busqueda es mas rapida
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email });
  } catch (error) {
    return res.status(500).json({ error: "Error del servidor" });
  }
}