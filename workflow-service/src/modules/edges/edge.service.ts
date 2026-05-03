import edgeRepository from "./edge.repository.js";
import type { IEdge } from "./edge.model.js";

const getEdge = async (edgeId: IEdge["id"]) => {
  const edge: IEdge | null = await edgeRepository.getEdge(edgeId);

  if (!edge) {
    throw new Error("Edge not found");
  }

  return edge;
};

const getEdges = async (workflowId: IEdge["workflowId"]): Promise<IEdge[]> => {
  const edges = await edgeRepository.getEdges(workflowId);

  if (!edges.length) {
    throw new Error("No edges found");
  }

  return edges;
};

const addEdge = async (workflowId: IEdge["workflowId"], edge: IEdge) => {
  if (!edge?.id) {
    throw new Error("Edge id is required");
  }

  return edgeRepository.addEdge(workflowId, edge);
};

const addEdges = async (workflowId: IEdge["workflowId"], edges: IEdge[]) => {
  if (!edges?.length) {
    throw new Error("Edges array is empty");
  }

  return edgeRepository.addEdges(workflowId, edges);
};

const removeEdge = async (edgeId: IEdge["id"]) => {
  const result: any = await edgeRepository.removeEdge(edgeId);

  if (!result?.deletedCount) {
    throw new Error("Edge not found or already deleted");
  }

  return result;
};

const updateEdge = async (
  edgeId: IEdge["id"],
  updateFields: Partial<IEdge>,
) => {
  const updated: IEdge | null = await edgeRepository.updateEdge(
    edgeId,
    updateFields,
  );

  if (!updated) {
    throw new Error("Edge not found");
  }

  return updated;
};

const edgeService = {
  getEdge,
  getEdges,
  addEdge,
  addEdges,
  removeEdge,
  updateEdge,
};

export default edgeService;
