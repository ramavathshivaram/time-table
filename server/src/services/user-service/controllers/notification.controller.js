import notificationRepository from "../repositorys/notification.repository.js";
import asyncHandler from "express-async-handler";
import ApiError from "#shared/lib/ApiError.js";

const getUnreadCount = asyncHandler(async (req, res) => {
  const userId = req.userID;
  const count = await notificationRepository.getUnreadCount(userId);
  res.status(200).json({ success: true, data: count });
});

const getUnreadNotifications = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const notifications =
    await notificationRepository.getUserUnreadNotifications(userId);
  res.status(200).json({ success: true, data: notifications });
});

export default { getUnreadCount, getUnreadNotifications };
