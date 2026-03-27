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
    const { workflowId } = useWorkflowStore.getState();
    addNodesEmit(workflowId, nodes);

    useWorkflowStore.getState().addNodesLocal(nodes);
  },

  removeNode(nodeId) {
    const { workflowId } = useWorkflowStore.getState();
    removeNodeEmit(workflowId, nodeId);

    useWorkflowStore.getState().removeNodeLocal(nodeId);
  },

  updateNode(nodeId, nodeData) {
    const { workflowId } = useWorkflowStore.getState();
    updateNodeEmit(workflowId, nodeId, nodeData);

    useWorkflowStore.getState().updateNodeLocal(nodeId, nodeData);
  },

  responseAdd(node) {
    useWorkflowStore.getState().addNodeLocal(node);
  },
};

export default nodeService;
