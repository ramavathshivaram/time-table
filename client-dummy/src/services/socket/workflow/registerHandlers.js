import { cleanupEdgeListeners, registerEdgeHandlers } from "./edges.socket.js";
import {
  cleanupFacultyListeners,
  registerFacultyHandlers,
} from "./faculty.socket.js";
import {
  cleanupMessageListeners,
  registerMessageHandlers,
} from "./message.socket.js";
import { cleanupNodeListeners, registerNodeHandlers } from "./nodes.socket.js";
import { cleanupRoomListeners, registerRoomHandlers } from "./room.socket.js";
import {
  cleanupSubjectListeners,
  registerSubjectHandlers,
} from "./subject.socket.js";

export const registerHandlers = () => {
  registerEdgeHandlers();
  registerFacultyHandlers();
  registerMessageHandlers();
  registerNodeHandlers();
  registerRoomHandlers();
  registerSubjectHandlers();
};

export const cleanupHandlers = () => {
  cleanupEdgeListeners();
  cleanupFacultyListeners();
  cleanupMessageListeners();
  cleanupNodeListeners();
  cleanupRoomListeners();
  cleanupSubjectListeners();
};
