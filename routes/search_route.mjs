import express from "express";
import { search } from "../controllers/search.mjs";

const router = express.Router();

//router.get('/', search);
router.get('/', search);

export default router; 