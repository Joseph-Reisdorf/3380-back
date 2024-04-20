import express from "express";
import { getArtistById, getArtists, searchArtistByName, getArtistRankingByAlbums, getArtistRankingByTracks, getArtistRankingByListens }from "../controllers/getArtist.mjs";
import { likeArtist, unlikeArtist, getLikedArtists, getArtistLikesCount } from "../controllers/artistLike.mjs";
import { addBio } from "../controllers/addBio.mjs";
const router = express.Router();

// path: /aritists/
router.get("/find_artist_by_id/:artist_id", getArtistById); 
router.get("/search", searchArtistByName);
router.get("/get_artists", getArtists);
router.get("/get_liked_artists/:person_id", getLikedArtists);
router.get("/get_artist_likes_count/:artist_id", getArtistLikesCount);


router.put("/update_artist_bio/:artist_id", addBio);

router.get("/get_artist_ranking_by_tracks/:start_date/:end_date", getArtistRankingByTracks);
router.get("/get_artist_ranking_by_albums/:start_date/:end_date", getArtistRankingByAlbums);
router.get("/get_artist_ranking_by_listens/:start_date/:end_date", getArtistRankingByListens);


router.post("/like/:artist_id/:person_id", likeArtist);

router.delete("/unlike/:artist_id/:person_id", unlikeArtist);



export default router;