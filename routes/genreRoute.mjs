import express from "express";
import { getGenreNameById, getAllGenreNames } from "../controllers/genreController.js";

const router = express.Router();

// Route to get genre name by ID
router.get("/getGenreName/:genreId", getGenreNameById);

// Route to get all genre names
router.get("/getAllGenreNames", getAllGenreNames);

export default router;