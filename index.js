import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

//IMPORTAMOS EXTENSION PARA USAR VAR DE ENTORNO
import "dotenv/config";

//CONECTAMOS MONGODB
import "./database/connectdb.js";

// RUTA DE AUTENTIFICACION
import authRouter from "./routes/auth.route.js";

// RUTAS DE LINKS
import linkRouter from "./routes/link.route.js";

//HEALTH ROUTE
import healthRouter from "./routes/health.route.js";

const whiteList = [process.env.ORIGIN1];

const app = express();
//habilita recibir solicitudes en json !IMPORTANTE
app.use(express.json());

//bloquea las solicitudes de fuentes no autorizadas y habilita las credenciales de cookies en el navegador
app.use(
  cors({
    origin: function (origin, callback) {
      if (whiteList.includes(origin) || process.env.MODE === "developer") {
        return callback(null, origin);
      }
      return callback(
        "Error de CORS. Host: ".concat(origin).concat(" no autorizado")
      );
    },
    credentials: true,
  })
);

//HABILITA LAS COOKIES
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

//INSTANCIAMOS LAS RUTAS
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/links", linkRouter);

app.use("/api/v1/health", healthRouter);

//INICIAMOS LOS PUERTOS
app.listen(PORT, () => console.log("PUERTO:", PORT));
