import express from "express";
import { getDepartments } from "../controllers/getDepartment.mjs";

const router = express.Router();

router.get("/get_departments", getDepartments)

export default router;