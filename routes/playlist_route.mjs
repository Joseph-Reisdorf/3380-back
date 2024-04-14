import express from "express";
import { getPlaylist, searchPlaylistByName, getPlaylistByListenerId }from "../controllers/getPlaylist.mjs";
import { addPlaylist } from "../controllers/addPlaylist.mjs";

const router = express.Router();

// path: /playlists/
router.get("/get_playlist", getPlaylist);
router.get("search", searchPlaylistByName);
router.get("/get_playlists_by_listener_id/:listener_id", getPlaylistByListenerId);

router.post("/add_playlist", addPlaylist); 


export default router;