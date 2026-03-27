import WORKFLOW_EVENTS from "../events.js";
import { getSocket } from "../../socket.js";

const socket = getSocket();

const logEmit = (event, payload) => {
  console.group(`📡 SOCKET EMIT: ${event}`);
  console.log("payload:", payload);
  console.log("time:", new Date().toISOString());
  console.groupEnd();
};

export const sendMessageEmit = (message) => {
  logEmit(WORKFLOW_EVENTS.MESSAGE_SEND, message);
  socket.emit(WORKFLOW_EVENTS.MESSAGE_SEND, message);
};
