import { verifyToken } from "#services/auth-service/services/token.service.js";

const socketAuthMiddleware = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    console.log(token)

    if (!token) {
      return next(new Error("Authentication failed: No token"));
    }
    const { userId } = verifyToken(token);

    socket.userId = userId;

    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
};

export default socketAuthMiddleware;
