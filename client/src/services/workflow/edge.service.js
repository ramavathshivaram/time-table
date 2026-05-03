import useWorkflowStore from "@/store/workflow.store.js";
import {edgeEmit} from "@/services/socket/workflow/edges.socket.js";

const edgeService = {
  addEdge(edge) {
    edgeEmit.add(edge);

    useWorkflowStore.getState().addEdgeLocal(edge);
  },

  addEdges(edges) {
    edgeEmit.addMany(edges);

    useWorkflowStore.getState().addEdgesLocal(edges);
  },

  removeEdge(edgeId) {
    edgeEmit.remove(edgeId);

    useWorkflowStore.getState().removeEdgeLocal(edgeId);
  },

  responseAdd(edge) {
    useWorkflowStore.getState().addEdgeLocal(edge);
  },
};

export default edgeService;
