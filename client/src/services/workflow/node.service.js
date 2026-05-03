import useWorkflowStore from "@/store/workflow.store.js";
import {nodeEmit} from "@/services/socket/workflow/nodes.socket.js";

const nodeService = {
  addNode(node) {
    nodeEmit.add(node);

    useWorkflowStore.getState().addNodeLocal(node);
  },

  addNodes(nodes) {
    nodeEmit.addMany(nodes);
    useWorkflowStore.getState().addNodesLocal(nodes);
  },

  removeNode(nodeId) {
    nodeEmit.remove(nodeId);

    useWorkflowStore.getState().removeNodeLocal(nodeId);
  },

  updateNode(nodeId, nodeData) {
    nodeEmit.update(nodeId, nodeData);

    useWorkflowStore.getState().updateNodeLocal(nodeId, nodeData);
  },

  responseAdd(node) {
    useWorkflowStore.getState().addNodeLocal(node);
  },

  updateNodePosition(nodeId, position) {
    nodeEmit.update(nodeId, { position });
  },
};

export default nodeService;
