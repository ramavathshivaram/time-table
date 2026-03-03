import { useCallback } from "react";
import dagre from "dagre";
import { toast } from "sonner";

const nodeWidth = 100;
const nodeHeight = 30;

export default function useAutoArrange(nodes, edges, setNodes) {
  return useCallback(() => {
    if (!nodes.length) return;

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    dagreGraph.setGraph({
      rankdir: "TB",
      ranksep: 150,
      nodesep: 20,
    });

    // Add nodes
    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    // Add edges
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    // Update node positions
    const arranged = nodes.map((node) => {
      const pos = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: pos.x - nodeWidth / 2,
          y: pos.y - nodeHeight / 2,
        },
        dragging: false,
      };
    });

    setNodes(arranged);
  }, [nodes, edges, setNodes]);
}
