import express from 'express';
import { getNewNotifications } from '../controllers/getNotification.mjs';

const router = express.Router();

// Route to fetch new notifications
router.get('/get_new_notifications/:person_id', getNewNotifications);

export default router;