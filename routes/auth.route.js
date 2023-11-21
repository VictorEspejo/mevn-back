import express from "express";
import {
  infoUser,  // Controlador para obtener información del usuario
  login,  // Controlador para iniciar sesión
  logout,  // Controlador para cerrar sesión
  refreshToken,  // Controlador para refrescar el token de acceso
  register,  // Controlador para registrar un nuevo usuario
} from "../controllers/auth.controller.js";
import {
  bodyLoginValidator,  // Validación del cuerpo de la solicitud para iniciar sesión
  bodyRegisterValidator,  // Validación del cuerpo de la solicitud para registrar usuario
} from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireAuth.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
const router = express.Router();

// Estructura de ruta: "NAME, MIDDLEWARE (VALIDACIONES), CONTROLADOR (POR ULTIMO)
// Al validar un MIDDLEWARE deberemos llamar a NEXT si ha pasado validacion o return sino.

//AÑADIMOS LAS VALIDACIONES EN EL MIDDLEWARE
router.post("/register", bodyRegisterValidator, register);  // Ruta para registrar un nuevo usuario

router.post("/login", bodyLoginValidator, login);  // Ruta para iniciar sesión

router.get("/refresh", requireRefreshToken, refreshToken);  // Ruta para refrescar el token de acceso

router.get("/logout", logout);  // Ruta para cerrar sesión

router.get("/protected", requireToken, infoUser);  // Ruta para obtener información del usuario (requiere token de acceso)

export default router;
