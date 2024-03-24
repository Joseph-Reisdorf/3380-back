import express from "express";
import { getPeople } from "../controllers/getPerson.mjs";
import { addPerson } from "../controllers/addPerson.mjs";

const router = express.Router();

router.get("/get_people", getPeople);
router.get("/get_person_by_id/:person_id", getPeople);



router.post("/add_person", addPerson);

export default router;