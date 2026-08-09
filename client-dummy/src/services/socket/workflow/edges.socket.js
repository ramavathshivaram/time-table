import { EDGE } from "./events.js";
import useWorkflowStore from "@/store/workflow.store.js";
import emit from "./emit.js";
import { getSocket } from "../socket.js";


export const edgeEmit = {
  add(edge) {
    emit(EDGE.ADD, edge);
  },

  addMany(edges) {
    emit(EDGE.ADD_MANY, edges);
  },

  remove(edgeId) {
    emit(EDGE.REMOVE, edgeId);
  },

  removeMany(edgeIds) {
    emit(EDGE.REMOVE_MANY, edgeIds);
  },
};

export const registerEdgeHandlers = () => {
  const socket = getSocket();

  socket.on(EDGE.ADD, (edge) => {
    console.log("⬇️ EDGE.ADD", edge);
    useWorkflowStore.getState().addEdgeLocal(edge);
  });

  socket.on(EDGE.REMOVE, (edgeId) => {
    console.log("⬇️ EDGE.REMOVE", edgeId);
    useWorkflowStore.getState().removeEdgeLocal(edgeId);
  });

  socket.on(EDGE.ADD_MANY, (edges) => {
    console.log("⬇️ EDGE.ADD_MANY", edges);
    useWorkflowStore.getState().addEdgesLocal(edges);
  });
};

export const cleanupEdgeListeners = () => {
  const socket = getSocket();

  socket.off(EDGE.ADD);
  socket.off(EDGE.REMOVE);
  socket.off(EDGE.ADD_MANY);
};