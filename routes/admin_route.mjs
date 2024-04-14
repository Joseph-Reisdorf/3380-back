import express from "express";
import { delArtists, delListeners, getArtists, getListeners } from "../controllers/adminDashboard.mjs";

const router = express.Router();

router.get("/artists", getArtists);
router.get("/listeners", getListeners);
router.delete("/deleteArtist/:artist_id", delArtists);
router.delete("/deleteListener/:listener_id", delListeners);

export default router;