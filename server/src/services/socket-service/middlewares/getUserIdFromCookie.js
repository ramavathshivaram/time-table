import cookie from "cookie";

const getUserIdFromCookie = (socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");

    if (!cookies.userId) {
      return next(new Error("Authentication error"));
    }

    socket.userId = cookies.userId;

    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
};

export default getUserIdFromCookie;
