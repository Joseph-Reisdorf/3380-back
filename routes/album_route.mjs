import express from "express";
import { getAlbumById, getAlbumsByArtist, getAlbums } from "../controllers/getAlbum.mjs";
import { addAlbum } from "../controllers/addAlbum.mjs";


const router = express.Router();

router.get("/find_album_by_id/:album_id", getAlbumById);
router.get("/find_albums_by_artist/:artist_id", getAlbumsByArtist);
router.get("/get_albums", getAlbums);

router.post("/add_album", addAlbum);

export default router;