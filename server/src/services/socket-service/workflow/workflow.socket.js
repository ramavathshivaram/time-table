import nodeSocket from "./listeners/nodes.socket.js";
import edgeSocket from "./listeners/edges.socket.js";
import facultySocket from "./listeners/faculty.socket.js";
import subjectSocket from "./listeners/subject.socket.js";
import roomSocket from "./listeners/room.socket.js";
import messageSocket from "./listeners/message.socket.js";

import { addWorkflowSocket } from "./workflow.socket.store.js";

const workflowSocket = (io, socket) => {
  addWorkflowSocket(socket.workflowId, socket.id);

  nodeSocket(io, socket);
  edgeSocket(io, socket);
  facultySocket(io, socket);
  subjectSocket(io, socket);
  roomSocket(io, socket);
  messageSocket(io, socket);
};

export default workflowSocket;
