import express from "express";
import { getPlaylistById, getPlaylists } from "../controllers/getPlaylist.mjs";
import { addPlaylist } from "../controllers/addPlaylist.mjs";

const router = express.Router();

router.get("/find_playlist_by_id/:playlist_id", getPlaylistById);
router.get("/get_playlists", getPlaylists);

router.post("/add_playlist", addPlaylist);

export default router;
