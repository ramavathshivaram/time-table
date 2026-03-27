import useWorkflowStore from "@/store/workflow.store";
import {
  addNodeEmit,
  addNodesEmit,
  removeNodeEmit,
  updateNodeEmit,
} from "@/services/socket/workflow/emitters/nodes.emit";

const nodeService = {
  addNode(node) {
    addNodeEmit(node);

    useWorkflowStore.getState().addNodeLocal(node);
  },

  addNodes(nodes) {
    addNodesEmit(nodes);
    useWorkflowStore.getState().addNodesLocal(nodes);
  },

  removeNode(nodeId) {
    removeNodeEmit(nodeId);

    useWorkflowStore.getState().removeNodeLocal(nodeId);
  },

  updateNode(nodeId, nodeData) {
    updateNodeEmit(nodeId, nodeData);

    useWorkflowStore.getState().updateNodeLocal(nodeId, nodeData);
  },

  responseAdd(node) {
    useWorkflowStore.getState().addNodeLocal(node);
  },

  updateNodePosition(nodeId, position) {
    updateNodeEmit(nodeId, { position });
  },
};

export default nodeService;
