import cookie from "cookie";
import { verifyToken } from "../../auth-service/services/token.service.js";

const getUserIdFromCookie = (socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");

    if (!cookies.accessToken) {
      return next(new Error("Authentication error"));
    }
    
    // verify token from auth service
    const { userId } = verifyToken(cookies.accessToken);

    socket.userId = userId;

    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
};

export default getUserIdFromCookie;
