import WORKFLOW_EVENTS from "../events.js";
import { getSocket } from "../../socket.js";

const socket = getSocket();

const logEmit = (event, payload) => {
  console.group(`📡 SOCKET EMIT: ${event}`);
  console.log("payload:", payload);
  console.log("time:", new Date().toISOString());
  console.groupEnd();
};

export const addEdgeEmit = (edge) => {
  logEmit(WORKFLOW_EVENTS.EDGE_ADD, edge);
  socket.emit(WORKFLOW_EVENTS.EDGE_ADD, edge);
};

export const removeEdgeEmit = (edgeId) => {
  logEmit(WORKFLOW_EVENTS.EDGE_REMOVE, edgeId);
  socket.emit(WORKFLOW_EVENTS.EDGE_REMOVE, edgeId);
};

export const addEdgesEmit = (edges) => {
  logEmit(WORKFLOW_EVENTS.EDGES_ADD, edges);
  socket.emit(WORKFLOW_EVENTS.EDGES_ADD, edges);
};

export const removeEdgesEmit = (edgeIds) => {
  logEmit(WORKFLOW_EVENTS.EDGES_REMOVE, edgeIds);
  socket.emit(WORKFLOW_EVENTS.EDGES_REMOVE, edgeIds);
};
