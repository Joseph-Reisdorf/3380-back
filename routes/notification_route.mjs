import express from 'express';
import { getNewNotifications } from '../controllers/getNotification.mjs';
import { getNewFollowerAlerts, markFollowerAlertAsSeen } from '../controllers/followerAlert.mjs';


const router = express.Router();

// app.use("/notifications", notificationRoute)
// Route to fetch new notifications
router.get('/get_new_notifications/:person_id', getNewNotifications);
router.get('/get_new_follower_alerts/:artist_id', getNewFollowerAlerts);
router.put('/mark_notification_as_seen/:follower_alert_id', markFollowerAlertAsSeen);


export default router;