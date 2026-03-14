import nodeSocket from "./nodes.socket.js";
import edgeSocket from "./edges.socket.js";
import facultySocket from "./faculty.socket.js";
import subjectSocket from "./subject.socket.js";
import roomSocket from "./room.socket.js";
import messageSocket from "./message.socket.js";

const workflowSocket = (io, socket) => {
  nodeSocket(io, socket);
  edgeSocket(io, socket);
  facultySocket(io, socket);
  subjectSocket(io, socket);
  roomSocket(io, socket);
  messageSocket(io, socket);
};

export default workflowSocket;
