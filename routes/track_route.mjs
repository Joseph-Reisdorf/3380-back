import express from "express";

import { getTracks, getTracksByAlbumId } from "../controllers/getTracks.mjs";
import { addTrack } from "../controllers/addTrack.mjs";
import { trackLike, trackUnlike } from "../controllers/trackLike.mjs";
import { getLikedTracks } from "../controllers/getTracks.mjs";

const router = express.Router();

router.get("/", getTracks);
router.get("/get_tracks_by_album/:album_id", getTracksByAlbumId);


router.post("/add_track", upload.single('track_mp3'), addTrack);

export default router;