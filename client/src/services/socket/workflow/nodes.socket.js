import { NODE } from "./events.js";
import useWorkflowStore from "@/store/workflow.store.js";
import emit from "./emit.js";
import { getSocket } from "../socket.js";

export const nodeEmit = {
  add(node) {
    emit(NODE.ADD, node);
  },

  addMany(nodes) {
    emit(NODE.ADD_MANY, nodes);
  },

  remove(nodeId) {
    emit(NODE.REMOVE, nodeId);
  },

  removeMany(nodeIds) {
    emit(NODE.REMOVE_MANY, nodeIds);
  },

  update(nodeId, nodeData) {
    emit(NODE.UPDATE, nodeId, nodeData);
  },
};

export const registerNodeHandlers = () => {
  const socket = getSocket();
  
  socket.on(NODE.ADD, (node) => {
    console.log("⬇️ NODE.ADD", node);
    useWorkflowStore.getState().addNodeLocal(node);
  });

  socket.on(NODE.REMOVE, (nodeId) => {
    console.log("⬇️ NODE.REMOVE", nodeId);
    useWorkflowStore.getState().removeNodeLocal(nodeId);
  });

  socket.on(NODE.UPDATE, (nodeId, nodeData) => {
    console.log("⬇️ NODE.UPDATE", nodeId, nodeData);
    useWorkflowStore.getState().updateNodeLocal(nodeId, nodeData);
  });

  socket.on(NODE.ADD_MANY, (nodes) => {
    console.log("⬇️ NODE.ADD_MANY", nodes);
    useWorkflowStore.getState().addNodesLocal(nodes);
  });
};

export const cleanupNodeListeners = () => {
  const socket = getSocket();

  socket.off(NODE.ADD);
  socket.off(NODE.REMOVE);
  socket.off(NODE.UPDATE);
  socket.off(NODE.ADD_MANY);
};
