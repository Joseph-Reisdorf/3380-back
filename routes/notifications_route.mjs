import express from "express";

import { getNotifications, getNotificationsByArtistId} from "../controllers/notifications.mjs";

const router = express.Router();

router.get("/get_notifications", getNotifications);
router.get("/get_notifications_by_artist_id/:artist_id", getNotificationsByArtistId);


export default router;

