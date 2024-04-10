import express from "express";

import { getTracks, getTrackBlob } from "../controllers/getTracks.mjs";


const router = express.Router();
router.get("/:trackId/blob", getTrackBlob);
router.get("/", getTracks);

export default router;