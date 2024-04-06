import express from "express";
import { addLike } from "../controllers/addLike.mjs";
import { getLike } from "../controllers/getLike.mjs";
import { unLike } from "../controllers/unLike.mjs";
import { updateLike } from "../controllers/updateLike.mjs";

const router = express.Router();


router.get("/get_like", getLike);
router.post("/add_like", addLike);
router.post("/unLike", unLike);
router.post("/updateLike", updateLike);

export default router;