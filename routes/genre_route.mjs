import express from "express";
import { getGenreNameById, getAllGenreNames, getMostListenedGenres, getMostListenedSongsByGenre, getGenres } from "../controllers/getGenre.mjs";

const router = express.Router();

// /genres
// Route to get genre name by ID
router.get("/getGenreName/:genreId", getGenreNameById);


// Route to get all genre names
router.get("/get_genres", getGenres);
router.get("/get_all_genre_names", getAllGenreNames);

// Route to get most listened genres
router.get("/get_most_listened_genres", getMostListenedGenres);

router.get("/get_most_listened_songs_by_genre", getMostListenedSongsByGenre);

export default router;