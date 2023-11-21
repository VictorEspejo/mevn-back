import express from "express";
import {
  infoUser,
  login,
  logout,
  refreshToken,
  register,
} from "../controllers/auth.controller.js";
import {
  bodyLoginValidator,
  bodyRegisterValidator,
} from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireAuth.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
const router = express.Router();

// Estructura de ruta: "NAME, MIDDLEWARE (VALIDACIONES), CONTROLADOR (POR ULTIMO)
// Al validar un MIDDLEWARE deberemos llamar a NEXT si ha pasado validacion o return sino.

//AÑADIMOS LAS VALIDACIONES EN EL MIDDLEWARE
router.post("/register", bodyRegisterValidator, register);

router.post("/login", bodyLoginValidator, login);

router.get("/refresh", requireRefreshToken, refreshToken);

router.get("/logout", logout);

router.get("/protected", requireToken, infoUser);

export default router;
