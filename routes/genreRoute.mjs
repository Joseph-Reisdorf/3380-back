import express from "express";
import { getGenreNameById, getAllGenreNames, getMostListenedGenres } from "../controllers/getGenre.mjs";
import { getMostListenedSongsByGenre } from "../controllers/getGenre.mjs";

const router = express.Router();

// Route to get genre name by ID
router.get("/getGenreName/:genreId", getGenreNameById);

// Route to get all genre names
router.get("/getAllGenreNames", getAllGenreNames);
router.get("/mostListenedGenres", getMostListenedGenres);
router.get("/getMostListenedSongsByGenre", getMostListenedSongsByGenre);

export default router;