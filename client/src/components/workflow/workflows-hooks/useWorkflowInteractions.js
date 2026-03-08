import { useEdgesState, useNodesState, useReactFlow } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import useDebounceSave from "./useDebounceSave.js";
import nodeTypes from "../nodeTypes.js";
import useModalStore from "@/store/modal.store.js";
import { generateEdgeId, generateNodeId } from "@/lib/utils.js";
import useGraphActions from "./useGraphActions.js";

const NODE_WIDTH = 150;
const NODE_HEIGHT = 80;

const useWorkflowInteractions = (
  initialWorkflowData,
  workflowId,
  reactFlowInstanceRef
) => {
  const openModal = useModalStore((s) => s.openModal);

  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialWorkflowData.nodes
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialWorkflowData.edges
  );

  const { getNodes, screenToFlowPosition } = useReactFlow();

  const { addNode, addEdgeAction } = useGraphActions();

  const debouncedSave = useDebounceSave(workflowId);

  // autosave
  useEffect(() => {
    debouncedSave({ nodes, edges });
  }, [nodes, edges, debouncedSave]);

  const onConnect = useCallback(
    (connection) => {
      addEdgeAction({
        id: generateEdgeId(),
        ...connection,
        type: "smoothstep",
      });
    },
    [addEdgeAction]
  );

  const isValidConnection = useCallback(
    (connection) => {
      const nodes = getNodes();

      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);

      if (!sourceNode || !targetNode) return false;

      const targetType = nodeTypes.find((n) => n.type === targetNode.type);

      return sourceNode.type === targetType?.parent;
    },
    [getNodes]
  );

  const onNodeDoubleClick = useCallback(
    (_, node) => {
      const rf = reactFlowInstanceRef.current;
      if (!rf) return;

      const screen = rf.flowToScreenPosition({
        x: node.position.x + node.width / 2,
        y: node.position.y + node.height / 2,
      });

      openModal(node, screen);
    },
    [openModal, reactFlowInstanceRef]
  );

  const onConnectEnd = useCallback(
    (_, connectionState) => {
      if (connectionState?.toNode || connectionState?.toHandle) return;

      const nextNodeType = nodeTypes.find(
        (n) => n?.parent === connectionState?.fromNode?.type
      );

      if (!nextNodeType) return;

      const position = screenToFlowPosition({
        x: connectionState.pointer.x - NODE_WIDTH / 2,
        y: connectionState.pointer.y - NODE_HEIGHT / 2,
      });

      const newNodeId = generateNodeId();

      addNode({
        id: newNodeId,
        type: nextNodeType.type,
        position,
        data: { label: nextNodeType.type },
      });

      addEdgeAction({
        id: generateEdgeId(),
        source: connectionState.fromNode.id,
        target: newNodeId,
        type: "smoothstep",
      });
    },
    [addNode, addEdgeAction, screenToFlowPosition]
  );

  return {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,

    onConnect,
    isValidConnection,
    onNodeDoubleClick,
    onConnectEnd,
  };
};

export default useWorkflowInteractions;