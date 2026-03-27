import useWorkflowStore from "@/store/workflow.store";
import {
  addEdgeEmit,
  addEdgesEmit,
  removeEdgeEmit,
} from "@/services/socket/workflow/emitters/edges.emit";

const edgeService = {
  addEdge(edge) {
    addEdgeEmit(edge);

    useWorkflowStore.getState().addEdgeLocal(edge);
  },

  addEdges(edges) {
    addEdgesEmit(edges);

    useWorkflowStore.getState().addEdgesLocal(edges);
  },

  removeEdge(edgeId) {
    removeEdgeEmit(edgeId);

    useWorkflowStore.getState().removeEdgeLocal(edgeId);
  },

  responseAdd(edge) {
    useWorkflowStore.getState().addEdgeLocal(edge);
  },
};

export default edgeService;
