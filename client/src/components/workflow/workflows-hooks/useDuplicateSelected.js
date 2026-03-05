import { generateEdgeId, generateNodeId } from "@/lib/utils.js";
import { useCallback } from "react";

const useDuplicateSelected = ({
  getNodes,
  getEdges,
  setNodes,
  setEdges,
}) => {
  return useCallback(() => {
    const nodes = getNodes();
    const edges = getEdges();

    const selectedNodes = nodes.filter((n) => n.selected);
    if (!selectedNodes.length) return;

    const nodeIdMap = new Map();

    const duplicatedNodes = selectedNodes.map((node) => {
      const newId = generateNodeId();
      nodeIdMap.set(node.id, newId);

      return {
        ...node,
        id: newId,
        position: {
          x: node.position.x + 60,
          y: node.position.y + 60,
        },
        selected: false,
      };
    });

    const duplicatedEdges = edges
      .filter(
        (edge) => nodeIdMap.has(edge.source) && nodeIdMap.has(edge.target),
      )
      .map((edge) => ({
        ...edge,
        id: generateEdgeId(),
        source: nodeIdMap.get(edge.source),
        target: nodeIdMap.get(edge.target),
        selected: false,
      }));

    // 5️⃣ Update state
    setNodes((nds) => [...nds, ...duplicatedNodes]);
    setEdges((eds) => [...eds, ...duplicatedEdges]);
  }, [getNodes, getEdges, setNodes, setEdges]);
};

export default useDuplicateSelected;
