import express from "express";
import { getAlbumById, getAlbumsByArtist, getAlbums, getAlbumLikeByPersonID, getAlbumCoverById } from "../controllers/getAlbum.mjs";
import { addAlbum } from "../controllers/addAlbum.mjs";


const router = express.Router();

router.get("/find_album_by_id/:album_id", getAlbumById);
router.get("/find_albums_by_artist/:artist_id", getAlbumsByArtist);
router.get("/get_albums", getAlbums);
router.get("/get_liked_albums/:album_id/:person_id", getAlbumLikeByPersonID);
router.get("/cover/:album_id", getAlbumCoverById);

router.post("/add_album", addAlbum);

export default router;