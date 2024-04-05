import express from "express";
import { addFollow } from "../controllers/addFollow.mjs";
import { getFollow } from "../controllers/getFollow.mjs";
import { unFollow } from "../controllers/unFollow.mjs";

const router = express.Router();


router.get("/get_follow", getFollow);
router.post("/add_follow", addFollow);
router.post("/unFollow", unFollow);

export default router;