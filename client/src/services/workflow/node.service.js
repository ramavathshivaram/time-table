import useWorkflowStore from "@/store/workflow.store";
import {
  addNodeEmit,
  addNodesEmit,
  removeNodeEmit,
  updateNodeEmit,
} from "@/services/socket/workflow/emitters/nodes.emit";

const nodeService = {
  addNode(node) {
    const { workflowId } = useWorkflowStore.getState();
    addNodeEmit(workflowId, node);

    useWorkflowStore.setState((state) => ({
      nodes: [...state.nodes, node],
    }));
  },

  addNodes(nodes) {
    const { workflowId } = useWorkflowStore.getState();
    addNodesEmit(workflowId, nodes);

    useWorkflowStore.setState((state) => ({
      nodes: [...state.nodes, ...nodes],
    }));
  },

  removeNode(nodeId) {
    const { workflowId } = useWorkflowStore.getState();
    removeNodeEmit(workflowId, nodeId);

    useWorkflowStore.setState((state) => ({
      nodes: state.nodes.filter((n) => n.id !== nodeId),
    }));
  },

  updateNode(nodeId, nodeData) {
    const { workflowId } = useWorkflowStore.getState();
    updateNodeEmit(workflowId, nodeId, nodeData);

    useWorkflowStore.setState((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId ? { ...n, data: nodeData } : n
      ),
    }));
  },

  responseAdd(node) {
    useWorkflowStore.setState((state) => ({
      nodes: [...state.nodes, node],
    }));
  },
};

export default nodeService;