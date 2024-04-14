import express from "express";
import { delArtists, delListeners, getArtists, getListeners, showArtistReport } from "../controllers/adminDashboard.mjs";

const router = express.Router();

router.get("/artists", getArtists);
router.get("/listeners", getListeners);
router.delete("/deleteArtist/:artist_id", delArtists);
router.delete("/deleteListener/:listener_id", delListeners);
router.get("/showArtistReport/:startMonth/:endMonth", showArtistReport);



export default router;