import express from "express";
import { getArtistById, getArtists, searchArtistByName }from "../controllers/getArtist.mjs";
import { likeArtist, unlikeArtist, getLikedArtists, getArtistLikesCount } from "../controllers/artistLike.mjs";
const router = express.Router();

// path: /aritists/
router.get("/find_artist_by_id/:artist_id", getArtistById); 
router.get("/search", searchArtistByName);
router.get("/get_artists", getArtists);
router.get("/get_liked_artists/:person_id", getLikedArtists);
router.get("/get_artist_likes_count/:artist_id", getArtistLikesCount);

router.post("/like/:artist_id/:person_id", likeArtist);

router.delete("/unlike/:artist_id/:person_id", unlikeArtist);

export default router;