import express from "express";
import multer from "multer";

import { getTracks, getTracksByAlbumId } from "../controllers/getTracks.mjs";
import { addTrack } from "../controllers/addTrack.mjs";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getTracks);
router.get("/get_tracks_by_album/:album_id", getTracksByAlbumId);


router.post("/add_track", upload.single('track_mp3'), addTrack);

export default router;