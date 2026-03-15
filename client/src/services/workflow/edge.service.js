import useWorkflowStore from "@/store/workflow.store";
import {
  addEdgeEmit,
  addEdgesEmit,
  removeEdgeEmit,
} from "@/services/socket/workflow/emitters/edges.emit";

const edgeService = {
  addEdge(edge) {
    const { workflowId } = useWorkflowStore.getState();
    addEdgeEmit(workflowId, edge);

    useWorkflowStore.setState((state) => ({
      edges: [...state.edges, edge],
    }));
  },

  addEdges(edges) {
    const { workflowId } = useWorkflowStore.getState();
    addEdgesEmit(workflowId, edges);

    useWorkflowStore.setState((state) => ({
      edges: [...state.edges, ...edges],
    }));
  },

  removeEdge(edgeId) {
    const { workflowId } = useWorkflowStore.getState();
    removeEdgeEmit(workflowId, edgeId);

    useWorkflowStore.setState((state) => ({
      edges: state.edges.filter((e) => e.id !== edgeId),
    }));
  },

  responseAdd(edge) {
    useWorkflowStore.setState((state) => ({
      edges: [...state.edges, edge],
    }));
  },
};

export default edgeService;