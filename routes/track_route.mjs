import express from "express";

import { getTracks, getTracksByAlbumId } from "../controllers/getTracks.mjs";
import { addTrack } from "../controllers/addTrack.mjs";
import { trackLike, trackUnlike } from "../controllers/trackLike.mjs";
import { getLikedTracks } from "../controllers/getTracks.mjs";

const router = express.Router();

router.get("/", getTracks);
router.get("/get_tracks_by_album/:album_id", getTracksByAlbumId);
router.get("/liked/:listener_id", getLikedTracks);

router.post("/add_track", addTrack);
router.post("/like/:trackId/:listener_id", trackLike);

router.delete("/unlike/:trackId/:listener_id", trackUnlike);

export default router;