import { useCallback } from "react";
import { nanoid } from 'nanoid'


const useDnD = ({ setNodes, reactFlowInstanceRef }) => {
  // Drag start
  const onDragStart = useCallback((e, type) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  // Drag over
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  // Drop
  const onDrop = useCallback(
    (e) => {
      e.preventDefault();

      const type = e.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = reactFlowInstanceRef.current.screenToFlowPosition({
        x: e.clientX - 70,
        y: e.clientY - 20,
      });

      const newNode = {
        id: `NODE_${nanoid()}`,
        type: type,
        position,
        data: {
          label: `${type} node`,
          type,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes, reactFlowInstanceRef],
  );

  return { onDragStart, onDragOver, onDrop };
};

export default useDnD;
