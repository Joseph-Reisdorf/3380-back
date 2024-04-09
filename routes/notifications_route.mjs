import express from "express";

import { getNotifications } from "../controllers/notifications.mjs";

const router = express.Router();

router.get("/get_notifications", getNotifications);



export default router;

