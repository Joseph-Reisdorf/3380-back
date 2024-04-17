import express from "express";
import { getArtistById, getArtists, searchArtistByName, getArtistRankingByTracks, getArtistRankingByAlbums, getArtistRankingByListens } from "../controllers/getArtist.mjs";

const router = express.Router();

// path: /aritists/
router.get("/find_artist_by_id/:artist_id", getArtistById); 
router.get("/search", searchArtistByName);
router.get("/get_artists", getArtists);
router.get("/get_artist_ranking_by_tracks", getArtistRankingByTracks);
router.get("/get_artist_ranking_by_albums", getArtistRankingByAlbums);
router.get("/get_artist_ranking_by_listens", getArtistRankingByListens);

export default router;
