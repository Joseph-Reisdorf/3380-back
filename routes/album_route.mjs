import express from "express";
import { getAlbumById, getAlbumByArtist, getAlbums } from "../controllers/getAlbum.mjs";


const router = express.Router();

router.get("/find_album_by_id/:album_id", getAlbumById);
router.get("/find_album_by_artist/:artist_id", getAlbumByArtist);
router.get("/get_albums", getAlbums);

export default router;