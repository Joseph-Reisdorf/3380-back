import express from "express";
import { delArtists, delListeners, generateArtistTable, showArtistReport, showListenerReport } from "../controllers/adminDashboard.mjs";

const router = express.Router();

router.delete("/deleteArtist/:artist_id", delArtists);
router.delete("/deleteListener/:listener_id", delListeners);
router.get("/showArtistReport/:startMonth/:endMonth", showArtistReport);
router.get("/showListenerReport/:startMonth/:endMonth", showListenerReport);
router.get("/generateArtistTable", generateArtistTable);



export default router;