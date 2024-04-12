import express from "express";
import { delArtists, getArtists, getListeners } from "../controllers/adminDashboard.mjs";

const router = express.Router();

router.get("/artists", getArtists);
router.get("/listeners", getListeners);
router.delete("/deleteArtist:artist_id", delArtists);

export default router;