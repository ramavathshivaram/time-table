import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const useDuplicateSelected = ({ nodes, edges, setNodes, setEdges }) => {
  return useCallback(() => {
    const selectedNodes = nodes.filter((n) => n.selected);
    const selectedEdges = edges.filter((e) => e.selected);

    if (!selectedNodes.length) return;

    const nodeIdMap = new Map();

    // 1️⃣ Duplicate nodes
    const duplicatedNodes = selectedNodes.map((node) => {
      const newId = `node_${uuidv4()}`;
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

    // 2️⃣ Duplicate edges ONLY if both nodes are duplicated
    const duplicatedEdges = selectedEdges
      .filter(
        (edge) => nodeIdMap.has(edge.source) && nodeIdMap.has(edge.target),
      )
      .map((edge) => ({
        ...edge,
        id: `edge_${uuidv4()}`,
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
