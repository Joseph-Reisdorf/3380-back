import express from "express";
import { getDepartments, addDepartment, deleteDepartment } from "../controllers/getDepartment.mjs";

const router = express.Router();

router.get("/get_departments", getDepartments)

router.post("/add_department", addDepartment)
router.delete("/delete_department", deleteDepartment)
export default router;