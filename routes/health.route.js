import express from "express";
import { sendOK } from "../utils/statusRequest.js";

const router = express.Router();

router.get("/", (req, res) => {
  sendOK(res, "API HEALTH");
});

export default router;
