import { validationResult } from "express-validator";
import { body, param } from "express-validator";
import fetch from "node-fetch";

//NEXT PERMITE QUE CONTINUE LA EJECUCIÓN AL CONTROLADOR
//Al usar express validator como validador en el middleware podemos obtener los errores a traves de validationResult
export const validationResultExpress = (req, res, next) => {
  //Interceptamos los errores de la validacion de express validator
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  next();
};

export const paramsLinkValidator = [
  param("id", "Formato no válido").trim().notEmpty().escape(),
  validationResultExpress
]

export const bodyRegisterValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Formato de password incorrecto")
    .trim()
    .isLength({ min: 6 })
    .custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("no coinciden las contraseñas");
      }
      return value;
    }),
  validationResultExpress,
];

export const bodyLoginValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Formato de password incorrecto")
    .trim()
    .isLength({ min: 6 }),
  validationResultExpress,
];


export const bodyLinkValidator = [
  body("longLink", "Formato link incorrecto").trim().notEmpty().exists().custom( async (value) => {
    try {
      await fetch(value);
      return value;
    } catch (error) {
      throw new Error("not found longlink 404");
    }
  }),
  validationResultExpress,
];