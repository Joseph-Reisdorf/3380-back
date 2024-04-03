import express from "express";

import { getTracks } from "../controllers/getTracks.mjs";

const router = express.Router();

router.get("/", getTracks);

export default router;