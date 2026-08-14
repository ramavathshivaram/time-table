import { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { nodeService } from "../services/node.service";
import { generateNodeId } from "../utils/generate-ids";
import { NODE_HEIGHT, NODE_WIDTH } from "../constants";

const DND_TYPE = "application/reactflow";

export const useDesignerDnD = () => {
  const { screenToFlowPosition } = useReactFlow();

  const onDragStart = useCallback((e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.setData(DND_TYPE, nodeType);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();

    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();

      const nodeType = e.dataTransfer.getData(DND_TYPE);

      if (!nodeType) return;

      const position = screenToFlowPosition({
        x: e.clientX - NODE_WIDTH / 2,
        y: e.clientY - NODE_HEIGHT / 2,
      });

      const newNode = {
        id: generateNodeId(),
        type: nodeType,
        position,
        data: {
          label: `New ${nodeType}`,
        },
      };

      nodeService.add(newNode);
    },
    [screenToFlowPosition],
  );

  return {
    onDragStart,
    onDragOver,
    onDrop,
  };
};
