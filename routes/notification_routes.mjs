import express from 'express';
import { getNewNotifications } from '../controllers/getNewNotification.mjs';

const router = express.Router();

// Route to fetch new notifications
router.get('/notifications', getNewNotifications);

export default router;