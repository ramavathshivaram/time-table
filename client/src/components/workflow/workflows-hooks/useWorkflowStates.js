import { useEdgesState, useNodesState, addEdge } from "@xyflow/react";

import { useCallback } from "react";
import useAutoArrange from "./useAutoArrange.js";
import useDuplicateSelected from "./useDuplicateSelected.js";

const useWorkflowInteractions = (initialWorkflowData, reactFlowInstanceRef) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialWorkflowData.nodes,
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialWorkflowData.edges,
  );

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
    onConnect,
    autoArrangement,
    duplicateSelected,
  };
};

export default useWorkflowInteractions;
