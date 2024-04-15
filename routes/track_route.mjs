import express from "express";
import multer from "multer";

import { getTracks, getTracksByAlbumId, getTrackBlob } from "../controllers/getTracks.mjs";
import { addTrack, listenTo } from "../controllers/addTrack.mjs";
import { trackLike, trackUnlike } from "../controllers/trackLike.mjs";
import { getLikedTracks, getTracksByListenTo } from "../controllers/getTracks.mjs";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getTracks);
router.get("/get_tracks_by_album/:album_id", getTracksByAlbumId);
router.get("/liked/:listener_id", getLikedTracks);
router.get("/blob/:trackId", getTrackBlob);
router.get("/listen_to/:listener_id", getTracksByListenTo);

router.post("/listen_to/:track_id/:listener_id", listenTo);
router.post("/add_track", upload.single('track_mp3'), addTrack);
router.post("/like/:trackId/:listener_id", trackLike);

router.delete("/unlike/:trackId/:listener_id", trackUnlike);

export default router;