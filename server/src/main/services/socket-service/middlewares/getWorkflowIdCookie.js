import cookie from "cookie";

const getWorkflowIdFromCookie = (socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");

    if (!cookies.workflowId) {
      return next(new Error("no workflow error"));
    }

    socket.workflowId = cookies.workflowId;

    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
};

export default getWorkflowIdFromCookie;
