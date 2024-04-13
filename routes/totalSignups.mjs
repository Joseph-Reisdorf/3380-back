import express from "express";
import { getTotalSignups } from "../controllers/getTotalSignups.mjs";

const router = express.Router();

router.post("/get_total_signups", getTotalSignups);

export default router;
