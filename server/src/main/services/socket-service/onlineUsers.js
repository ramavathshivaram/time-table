const users = new Map(); // userId -> socketId
const sockets = new Map(); // socketId -> userId

const addUser = (userId, socketId) => {
  users.set(userId, socketId);
  sockets.set(socketId, userId);
};

const removeUserBySocketId = (socketId) => {
  const userId = sockets.get(socketId);

  if (userId) {
    users.delete(userId);
    sockets.delete(socketId);
  }
};

const getSocketIdByUserId = (userId) => {
  return users.get(userId);
};

const getUserIdBySocketId = (socketId) => {
  return sockets.get(socketId);
};

const getOnlineUsers = () => {
  return [...users.keys()];
};

export default {
  addUser,
  removeUserBySocketId,
  getSocketIdByUserId,
  getUserIdBySocketId,
  getOnlineUsers,
};