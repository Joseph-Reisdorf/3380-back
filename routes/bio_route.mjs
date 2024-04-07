
import express from "express";
import { addBiography } from "../controllers/addBio.mjs";
import { getBiography } from "../controllers/getBio.mjs";

const router = express.Router();

router.post("/add_biography/:artist_id/:artist_biography", addBiography);
router.get("/get_biography/:artist_id", getBiography);

export default router;