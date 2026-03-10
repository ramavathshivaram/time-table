import api from "../axios.js";

export const getUserDetailsApi = async (data) => {
  const res = await api.get("/user", data);
  return res.data.data;
};

export const updateDarkModeApi = async (data) => {
  const res = await api.put("/user/dark-mode", data);
  return res.data.data;
};

//! Notification

export const getUnreadNotifications = async () => {
  const res = await api.get("/notifications/unread-notifications");
  return res.data.data;
};
