import express from "express";
import { getArtistById, getArtists, searchArtistByName }from "../controllers/getArtist.mjs";

const router = express.Router();

router.get("/find_artist_by_id/:artist_id", getArtistById);
router.get("/get_artists", getArtists);
router.get("/search", searchArtistByName);


export default router;