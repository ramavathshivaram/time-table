import { useCallback } from "react";
import dagre from "dagre";

export default function useAutoArrange(nodes, edges, setNodes) {
  return useCallback(() => {
    if (!nodes.length) return;

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({
      rankdir: "TB",
      ranksep: 40,
      nodesep: 25,
    });

    // Add nodes
    nodes.forEach((node) => {
      const width = node.measured?.width || 150;
      const height = node.measured?.height || 50;

      dagreGraph.setNode(node.id, { width, height });
    });

    // Add edges
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const arranged = nodes.map((node) => {
      const width = node.measured?.width || 150;
      const height = node.measured?.height || 50;

      const pos = dagreGraph.node(node.id);

      if (!pos) return node; // safety

      return {
        ...node,
        position: {
          x: pos.x - width / 2,
          y: pos.y - height / 2,
        },
        style: {
          ...node.style,
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        },
      };
    });

    setNodes(arranged);

    // 🔥 Remove transition after animation
    setTimeout(() => {
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          style: {
            ...n.style,
            transition: undefined,
          },
        }))
      );
    }, 350);
  }, [nodes, edges, setNodes]);
}