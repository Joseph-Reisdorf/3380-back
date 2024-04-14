import express from "express";
import { getArtistById, getArtists, searchArtistByName }from "../controllers/getArtist.mjs";

const router = express.Router();

// path: /aritists/
router.get("/find_artist_by_id/:artist_id", getArtistById); 
router.get("/search", searchArtistByName);
router.get("/get_artists", getArtists);

export default router;