import express from "express";
import { getPlaylist, searchPlaylistByName, getPlaylistByListenerId, getTracksByPlaylistId }from "../controllers/getPlaylist.mjs";
import { addPlaylist, addTrack, removeTrack } from "../controllers/addPlaylist.mjs";

const router = express.Router();

// path: /playlists/
router.get("/get_playlist", getPlaylist);
router.get("search", searchPlaylistByName);
router.get("/get_playlists_by_listener_id/:listener_id", getPlaylistByListenerId);
router.get("/get_tracks_by_playlist_id/:playlist_id", getTracksByPlaylistId);


router.post("/add_track/:playlist_id/:track_id", addTrack);
router.post("/remove_track/:playlist_id/:track_id", removeTrack);

router.post("/add_playlist", addPlaylist); 


export default router;