import express from "express";
import { getRecents } from "../controllers/getRecents.mjs";
import { addRecents } from "../controllers/addRecents.mjs";

const router = express.Router();

router.get("/get_recents", getRecents);
router.get("/add_recents", addRecents);

export default router;