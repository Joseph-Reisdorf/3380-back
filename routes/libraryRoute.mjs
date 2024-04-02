import express from "express";
import {getLibrary} from "../controllers/getLibrary.mjs";


const router = express.Router();


router.get("/get_library", getLibrary);

export default router;