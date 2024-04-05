import express from "express";
import { getGenre }from "../controllers/getGenre.mjs";

const router = express.Router();

router.get("/", getGenre);



export default router;