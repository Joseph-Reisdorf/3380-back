import express from "express";
import { getClicks, showAlbumReport, generateAlbumTable } from "../controllers/getClicks.mjs";
import { addClicks } from "../controllers/addClicks.mjs";



const router = express.Router();


router.get("/get_clicks", getClicks);
router.get("/show_album_report/:listenerId/:startMonth/:endMonth/:albumTitle?", showAlbumReport);
router.get("/generateAlbumTable", generateAlbumTable);
router.post("/add_clicks", addClicks);


export default router;