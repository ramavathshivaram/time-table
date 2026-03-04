import { useEdgesState, useNodesState, addEdge } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import useAutoArrange from "./useAutoArrange.js";
import useDuplicateSelected from "./useDuplicateSelected.js";
import useDebounceSave from "./useDebounceSave.js";

const useWorkflowInteractions = (initialWorkflowData, workflowId) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialWorkflowData.nodes,
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialWorkflowData.edges,
  );

  const debouncedSave = useDebounceSave(workflowId);

  useEffect(() => {
    debouncedSave({
      nodes,
      edges,
    });
  }, [nodes, edges, debouncedSave]);

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "bezier",
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  const autoArrangement = useAutoArrange(nodes, edges, setNodes);

  const duplicateSelected = useDuplicateSelected({
    nodes,
    edges,
    setNodes,
    setEdges,
  });

  return {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    // interactions
    onConnect,
    autoArrangement,
    duplicateSelected,
  };
};

export default useWorkflowInteractions;
