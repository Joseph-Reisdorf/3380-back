import express from "express";
import { register } from "../controllers/register.mjs";
import { registerEmployee } from "../controllers/registerEmployee.mjs";

const router = express.Router();

router.post('/', register);
router.post('/employee', registerEmployee);

export default router; 