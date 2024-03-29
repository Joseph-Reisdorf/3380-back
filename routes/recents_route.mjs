import express from "express";
import { getRecents } from "../controllers/getRecents.mjs";

const router = express.Router();

router.get("/recents", getRecents);

export default router;