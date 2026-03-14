import { useCallback } from "react";
import { generateNodeId } from "@/lib/utils.js";
import useWorkflowStore from "@/store/workflow.store";

const NODE_WIDTH = 150;
const NODE_HEIGHT = 80;

const useDnD = ({ reactFlowInstanceRef }) => {
  const addNode = useWorkflowStore((s) => s.addNode);

  const onDragStart = useCallback((e, type) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();

      const type = e.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position =
        reactFlowInstanceRef.current.screenToFlowPosition({
          x: e.clientX - NODE_WIDTH / 2,
          y: e.clientY - NODE_HEIGHT / 2,
        });

      addNode({
        id: generateNodeId(),
        type,
        position,
        data: { label: type, type },
      });
    },
    [addNode, reactFlowInstanceRef]
  );

  return { onDragStart, onDragOver, onDrop };
};

export default useDnD;