import { Router } from "express";
import { createLink, getLink, getLinks, getNanoLink, removeLink, updateLink } from "../controllers/links.controller.js";
import { requireToken } from "../middlewares/requireAuth.js";
import { bodyLinkValidator, paramsLinkValidator } from "../middlewares/validationResultExpress.js";

const router = Router();

//GET all links

router.get("/", requireToken, getLinks);
router.post("/", requireToken, bodyLinkValidator, createLink);
//router.get("/:id", requireToken, paramsLinkValidator, getLink);
router.get("/:nanoLink", getNanoLink);
router.delete("/:id", requireToken, paramsLinkValidator, removeLink);
router.patch("/:id", requireToken, bodyLinkValidator, updateLink);

export default router;
