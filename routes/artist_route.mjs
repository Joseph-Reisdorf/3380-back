import express from "express";
import { getArtistById, getArtists }from "../controllers/getArtist.mjs";

const router = express.Router();

router.get("/find_artist_by_id/:artist_id", getArtistById);
router.get("/get_artists", getArtists);

export default router;