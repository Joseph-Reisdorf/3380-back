import express from "express";
import { getAlbumById, getAlbumByArtist, getAlbums, getAlbumLikeCountByArtist } from "../controllers/getAlbums.mjs";
import { addAlbum, uploadTracks } from "../controllers/addAlbum.mjs";

const router = express.Router();

router.get("/find_album_by_id/:album_id", getAlbumById);
router.get("/find_album_by_artist/:artist_id", getAlbumByArtist);
router.get("/get_albums", getAlbums);
router.get("/likes/:artist_id", getAlbumLikeCountByArtist);
router.post("/add_album", uploadTracks, addAlbum);



export default router;

