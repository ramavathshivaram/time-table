import { useCallback } from "react";

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
        x: e.clientX-70,
        y: e.clientY-20,
      });

      const newNode = {
        id: generateNodeId(),
        type: "default",
        position,
        data: {
          label: `${type} node`,
          nodeType: type,
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes, reactFlowInstanceRef],
  );

  return { onDragStart, onDragOver, onDrop };
};

const generateNodeId = () => {
  return `node_${Math.random().toString(36).substring(2, 10)}`;
};

export default useDnD;
