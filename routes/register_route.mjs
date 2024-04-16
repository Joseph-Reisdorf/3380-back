import express from "express";
import { register } from "../controllers/register.mjs";

const router = express.Router();

router.post('/', register);
router.post('/register', register);

export default router; 