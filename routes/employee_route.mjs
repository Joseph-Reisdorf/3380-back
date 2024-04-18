import express from "express";
import { getEmployees, getAdmins } from "../controllers/getEmployee.mjs";

const router = express.Router();

router.get("/get_employees", getEmployees)
router.get("/get_admins", getAdmins)

export default router;