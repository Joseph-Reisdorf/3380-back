import express from "express";
import { getAgeData } from "../controllers/getDashboardMetrics.mjs";

const router = express.Router();

router.get("/get_age_data", getAgeData);

export default router;