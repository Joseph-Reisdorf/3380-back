import express from "express";
import { getMostListenedGenres } from "../controllers/getGenresMostListened.mjs";

const router = express.Router();

// Route to get most listened genres
router.get("/mostListenedGenres", getMostListenedGenres);

export default router;
