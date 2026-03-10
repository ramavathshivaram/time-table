import NotificationModel from "../models/notification.model.js";

const addNotification = async (notification) => {
  return await NotificationModel.create(notification);
};

const removeNotification = async (notificationId) => {
  return await NotificationModel.findByIdAndDelete(notificationId);
};

const updateNotification = async (notificationId, data) => {
  return await NotificationModel.findByIdAndUpdate(notificationId, data, {
    new: true,
  });
};

const getNotification = async (notificationId) => {
  return await NotificationModel.findById(notificationId);
};

const getUserUnreadNotifications = async (userId, page = 1, limit = 5) => {
  return await NotificationModel.find({ userId, read: false })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
};

const markAsRead = async (notificationId) => {
  return await NotificationModel.findByIdAndUpdate(
    notificationId,
    { read: true },
    { new: true },
  );
};

const markAllAsRead = async (userId) => {
  return await NotificationModel.updateMany(
    { userId, read: false },
    { $set: { read: true } },
  );
};

const getUnreadCount = async (userId) => {
  return await NotificationModel.countDocuments({
    userId,
    read: false,
  });
};

export default {
  addNotification,
  removeNotification,
  updateNotification,
  getNotification,
  getUserUnreadNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
};
