import express from "express";
import { getClicks, showAlbumReport, generateAlbumTable } from "../controllers/getAlbumClicks.mjs";
import { addClicks } from "../controllers/addAlbumClicks.mjs";



const router = express.Router();


router.get("/get_clicks", getClicks);
router.get("/show_album_report/:listenerId/:startMonth/:endMonth", showAlbumReport);
router.get("/generateAlbumTable", generateAlbumTable);
router.post("/add_clicks", addClicks);


export default router;