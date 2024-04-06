
import express from "express";
import { addBiography, getBiography } from "../controllers/biographyController.mjs";

const router = express.Router();

router.post("/add_biography", addBiography);