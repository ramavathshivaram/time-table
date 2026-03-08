import { GraphEvents } from "@/lib/constants/events";
import { getSocket } from "../socket";

const useGraphEmitter = () => {
  const socket = getSocket();

  const logEmit = (event, payload) => {
    console.group(`📡 SOCKET EMIT: ${event}`);
    console.log("payload:", payload);
    console.log("time:", new Date().toISOString());
    console.groupEnd();
  };

  const addNodeEmit = (node) => {
    logEmit(GraphEvents.NODE_ADD, node);
    socket.emit(GraphEvents.NODE_ADD, node);
  };

  const addNodesEmit = (nodes) => {
    logEmit(GraphEvents.NODES_ADD, nodes);
    socket.emit(GraphEvents.NODES_ADD, nodes);
  };

  const updateNodeEmit = (id, data) => {
    const payload = { id, data };
    logEmit(GraphEvents.NODE_UPDATE, payload);
    socket.emit(GraphEvents.NODE_UPDATE, payload);
  };

  const removeNodeEmit = (id) => {
    logEmit(GraphEvents.NODE_REMOVE, id);
    socket.emit(GraphEvents.NODE_REMOVE, id);
  };

  const removeNodesEmit = (ids) => {
    logEmit(GraphEvents.NODES_REMOVE, ids);
    socket.emit(GraphEvents.NODES_REMOVE, ids);
  };

  const addEdgeEmit = (edge) => {
    logEmit(GraphEvents.EDGE_ADD, edge);
    socket.emit(GraphEvents.EDGE_ADD, edge);
  };

  const addEdgesEmit = (edges) => {
    logEmit(GraphEvents.EDGES_ADD, edges);
    socket.emit(GraphEvents.EDGES_ADD, edges);
  };

  const updateEdgeEmit = (id, data) => {
    const payload = { id, data };
    logEmit(GraphEvents.EDGE_UPDATE, payload);
    socket.emit(GraphEvents.EDGE_UPDATE, payload);
  };

  const removeEdgeEmit = (id) => {
    logEmit(GraphEvents.EDGE_REMOVE, id);
    socket.emit(GraphEvents.EDGE_REMOVE, id);
  };

  const removeEdgesEmit = (ids) => {
    logEmit(GraphEvents.EDGES_REMOVE, ids);
    socket.emit(GraphEvents.EDGES_REMOVE, ids);
  };

  return {
    addNodeEmit,
    addNodesEmit,
    updateNodeEmit,
    removeNodeEmit,
    removeNodesEmit,

    addEdgeEmit,
    addEdgesEmit,
    updateEdgeEmit,
    removeEdgeEmit,
    removeEdgesEmit,
  };
};

export default useGraphEmitter;
