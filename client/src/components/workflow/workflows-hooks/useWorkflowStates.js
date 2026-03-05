import { useEdgesState, useNodesState, addEdge } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import useDebounceSave from "./useDebounceSave.js";

const useWorkflowInteractions = (initialWorkflowData, workflowId) => {
  const [nodes, setNodes, onNodesChangeRF] = useNodesState(
    initialWorkflowData.nodes,
  );

  const [edges, setEdges, onEdgesChangeRF] = useEdgesState(
    initialWorkflowData.edges,
  );

  const debouncedSave = useDebounceSave(workflowId);

  useEffect(() => {
    debouncedSave({ nodes, edges });
  }, [nodes, edges, debouncedSave]);

  const onConnect = useCallback(
    (connection) => {
      const edge = {
        ...connection,
        type: "bezier",
      };

      setEdges((eds) => addEdge(edge, eds));

      console.log("edge add");
    },
    [setEdges],
  );

  const onNodesChange = useCallback(
    (changes) => {
      onNodesChangeRF(changes);

      for (const change of changes) {
        switch (change.type) {
          case "add":
            console.log("node add", change.item);
            break;

          case "remove":
            console.log("node remove", change.id);
            break;

          case "position":
            // ignore position spam if needed
            break;

          case "update":
            console.log("node update", change.id);
            break;

          default:
            break;
        }
      }
    },
    [onNodesChangeRF],
  );

  const onEdgesChange = useCallback(
    (changes) => {
      onEdgesChangeRF(changes);

      for (const change of changes) {
        switch (change.type) {
          case "add":
            console.log("edge add", change.item);
            break;

          case "remove":
            console.log("edge remove", change.id);
            break;

          case "update":
            console.log("edge update", change.id);
            break;

          default:
            break;
        }
      }
    },
    [onEdgesChangeRF],
  );

  return {
    nodes,
    setNodes,
    onNodesChange,

    edges,
    setEdges,
    onEdgesChange,

    onConnect,
  };
};

export default useWorkflowInteractions;
