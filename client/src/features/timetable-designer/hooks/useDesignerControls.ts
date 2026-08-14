import { useCallback, useMemo } from "react";
import { useReactFlow } from "@xyflow/react";

import { useDesignerStore } from "../store/designer.store";

import { nodeService } from "../services/node.service";
import { edgeService } from "../services/edge.service";
import { generateEdgeId, generateNodeId } from "../utils/generate-ids";


export const useDesignerControls = () => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const nodes = useDesignerStore((state) => state.nodes);

  const edges = useDesignerStore((state) => state.edges);

  const hasSelection = useMemo(
    () => nodes.some((node) => node.selected),
    [nodes],
  );

  // ---------------- Select All ----------------

  const selectAll = useCallback(() => {
    nodeService.updateMany({
      selected: true,
    });
  }, []);

  // ---------------- Delete Selected ----------------

  const deleteSelected = useCallback(() => {
    const selectedIds = nodes
      .filter((node) => node.selected)
      .map((node) => node.id);

    if (!selectedIds.length) {
      return;
    }

    nodeService.removeMany(selectedIds);
  }, [nodes]);

  // ---------------- Duplicate ----------------

  const duplicateSelected = useCallback(() => {
    const selectedNodes = nodes.filter((node) => node.selected);

    if (!selectedNodes.length) {
      return;
    }

    const idMap = new Map<string, string>();

    const duplicatedNodes = selectedNodes.map((node) => {
      const newId = generateNodeId();

      idMap.set(node.id, newId);

      return {
        ...node,
        id: newId,

        position: {
          x: node.position.x + 40,
          y: node.position.y + 40,
        },

        selected: true,
      };
    });

    const duplicatedEdges = edges
      .filter((edge) => idMap.has(edge.source) && idMap.has(edge.target))
      .map((edge) => ({
        ...edge,

        id: generateEdgeId(),

        source: idMap.get(edge.source)!,

        target: idMap.get(edge.target)!,
      }));

    // Deselect originals
    nodeService.updateMany({
      selected: false,
    });

    // Add duplicated nodes
    nodeService.addMany(duplicatedNodes);

    // Add duplicated edges
    if (duplicatedEdges.length) {
      edgeService.addMany(duplicatedEdges);
    }
  }, [nodes, edges]);

  // ---------------- Auto Arrange ----------------

  const autoArrange = useCallback(() => {
    // Dagre / ELK implementation
  }, []);

  // ---------------- Undo ----------------

  const undo = useCallback(() => {
    console.log("Undo");
  }, []);

  // ---------------- Redo ----------------

  const redo = useCallback(() => {
    console.log("Redo");
  }, []);

  return {
    hasSelection,

    selectAll,
    deleteSelected,
    duplicateSelected,
    autoArrange,

    zoomIn,
    zoomOut,
    fitView,

    undo,
    redo,
  };
};
