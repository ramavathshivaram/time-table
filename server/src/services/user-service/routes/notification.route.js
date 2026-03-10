import express from "express";
import notificationController from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/unread-count", notificationController.getUnreadCount);

router.get("/unread-notifications", notificationController.getUnreadNotifications);

export default router;