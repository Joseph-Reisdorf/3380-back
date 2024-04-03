import express from "express";
import { addPlaylist } from "../controllers/playlistController.mjs";

const router = express.Router();

// Define routes for handling playlist-related operations
router.post("/add_playlist", addPlaylist);

export default router;
