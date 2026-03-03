import { useCallback } from "react";
import { nanoid } from "nanoid";

const useDuplicateSelected = ({ nodes, edges, setNodes, setEdges }) => {
  return useCallback(() => {
    const selectedNodes = nodes.filter((n) => n.selected);
    const selectedEdges = edges.filter((e) => e.selected);

    if (!selectedNodes.length) return;

    const nodeIdMap = new Map();

    // 1️⃣ Duplicate nodes
    const duplicatedNodes = selectedNodes.map((node) => {
      const newId = `NODE_${nanoid()}`;
      nodeIdMap.set(node.id, newId);

      return {
        ...node,
        id: newId,
        position: {
          x: node.position.x + 40,
          y: node.position.y + 40,
        },
        selected: false,
      };
    });

    console.log(duplicatedNodes);

    // 2️⃣ Duplicate edges ONLY if both nodes are duplicated
    const duplicatedEdges = selectedEdges
      .filter(
        (edge) => nodeIdMap.has(edge.source) && nodeIdMap.has(edge.target),
      )
      .map((edge) => ({
        ...edge,
        id: `EDGE_${nanoid()}`,
        source: nodeIdMap.get(edge.source),
        target: nodeIdMap.get(edge.target),
        selected: false,
      }));

    // 3️⃣ Update state
    setNodes((nds) => [...nds, ...duplicatedNodes]);
    setEdges((eds) => [...eds, ...duplicatedEdges]);
  }, [nodes, edges, setNodes, setEdges]);
};

export default useDuplicateSelected;
