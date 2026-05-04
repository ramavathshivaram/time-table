import type { Server } from "http";
import type { Socket } from "socket.io";

import { registerNodeHandlers } from "./node.socket.js";
import {registerEdgeHandlers} from "./edge.socket.js";
import {registerFacultyHandlers} from "./faculty.socket.js";
import {registerSubjectHandlers} from "./subject.socket.js";
import {registerRoomHandlers} from "./room.socket.js";
import {registerMessageHandlers} from "./message.socket.js";

import workflowSocketStore from "./workflow.socket.store.js";

const registerWorkflowHandlers = (socket: Socket) => {
  workflowSocketStore.add(socket.workflowId, socket.id);

  registerNodeHandlers(socket);
  registerEdgeHandlers(socket);
  registerFacultyHandlers(socket);
  registerSubjectHandlers(socket);
  registerRoomHandlers(socket);
  registerMessageHandlers(socket);
};

export default registerWorkflowHandlers;
