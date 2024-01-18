import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  sendOK(res, "API HEALTH");
});

export default router;
