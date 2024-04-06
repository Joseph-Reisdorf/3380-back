import express from "express";
import { addAlbum, uploadTracks } from "../controllers/addAlbum.mjs";



const router = express.Router();



router.post("/", uploadTracks, addAlbum);
export default router;