import express from "express";
import { getMostListenedSongsByGenre } from "../controllers/getMostListenedSongsByGenre.mjs";

const router = express.Router();

// Route to get the most listened to songs
router.get("/", getMostListenedSongsByGenre);

export default router;
