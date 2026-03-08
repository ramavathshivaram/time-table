import { useCallback } from "react";

const useDeleteSelected = ({ getNodes, getEdges, setNodes, setEdges }) => {
  return useCallback(() => {
    const nodes = getNodes();
    const edges = getEdges();

    const selectedNodes = nodes.filter((n) => n.selected);
    const selectedEdges = edges.filter((e) => e.selected);

    if (!selectedNodes.length && !selectedEdges.length) return;

    const selectedIds = new Set(selectedNodes.map((n) => n.id));

    setNodes((nds) => nds.filter((n) => !selectedIds.has(n.id)));

    setEdges((eds) =>
      eds.filter(
        (e) =>
          !selectedIds.has(e.source) &&
          !selectedIds.has(e.target) &&
          !e.selected
      )
    );
  }, [getNodes, getEdges, setNodes, setEdges]);
};

export default useDeleteSelected;