import { useEdgesState, useNodesState, addEdge } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import useDebounceSave from "./useDebounceSave.js";
import nodeTypes from "../nodeTypes.js";
import useModalStore from "@/store/modal.store.js";
import { generateEdgeId, generateNodeId } from "@/lib/utils.js";

const useWorkflowInteractions = (
  initialWorkflowData,
  workflowId,
  reactFlowInstanceRef,
) => {
  const openModal = useModalStore((s) => s.openModal);
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

  const isValidConnection = useCallback(
    (connection) => {
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);

      const targetType = nodeTypes.find((n) => n.type === targetNode.type);

      if (sourceNode.type === targetType.parent) {
        return true;
      }

      return false;
    },
    [nodes],
  );

  const onNodeDoubleClick = (event, node) => {
    const rf = reactFlowInstanceRef.current;

    const screen = rf.flowToScreenPosition({
      x: node.position.x + node.width / 2,
      y: node.position.y + node.height / 2,
    });

    openModal(node, screen);
  };

  const onConnectEnd = (event, connectionState) => {
    const rf = reactFlowInstanceRef.current;

    if (!rf) return;

    if (connectionState?.toNode || connectionState?.toHandle) {
      return;
    }

    const node = nodeTypes.find(
      (n) => n?.parent === connectionState?.fromNode?.type,
    );

    if (!node) return;

    const position = rf.screenToFlowPosition({
      x: connectionState.pointer.x - 75,
      y: connectionState.pointer.y - 40,
    });

    const newNodeId = generateNodeId();

    const newNode = {
      id: newNodeId,
      type: node.type,
      position,
      data: { label: node.type },
    };

    setNodes((nds) => [...nds, newNode]);

    const edge = {
      id: generateEdgeId(),
      source: connectionState.fromNode.id,
      target: newNodeId,
      type: "bezier",
    };

    setEdges((eds) => [...eds, edge]);
  };

  return {
    // nodes
    nodes,
    setNodes,
    onNodesChange,
    // edges
    edges,
    setEdges,
    onEdgesChange,
    // interactions
    onConnect,
    isValidConnection,
    onNodeDoubleClick,
    onConnectEnd,
  };
};

export default useWorkflowInteractions;
