import {
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from "@xyflow/react";
import { useCallback } from "react";
import nodeTypes from "../nodeTypes.js";
import useModalStore from "@/store/modal.store.js";
import { generateEdgeId, generateNodeId } from "@/lib/utils.js";
import useWorkflowStore from "@/store/workflow.store.js";
import nodeService from "@/services/workflow/node.service.js";
import edgeService from "@/services/workflow/edge.service.js";

const NODE_WIDTH = 150;
const NODE_HEIGHT = 80;

const useWorkflowInteractions = (reactFlowInstanceRef) => {
  const openModal = useModalStore((s) => s.openModal);

  const nodes = useWorkflowStore((s) => s.nodes);
  const setNodes = useWorkflowStore((s) => s.setNodes);

  const edges = useWorkflowStore((s) => s.edges);
  const setEdges = useWorkflowStore((s) => s.setEdges);

  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange = useCallback(
    (changes) => {
      console.log(changes);

      for (let change of changes) {
        switch (change.type) {
          case "remove":
            console.log("remove");
            nodeService.removeNode(change.id);
        }
      }

      setNodes(applyNodeChanges(changes, nodes));
    },
    [setNodes, nodes],
  );

  const onEdgesChange = useCallback(
    (changes) => {
      console.log(changes);

      for (let change of changes) {
        switch (change.type) {
          case "remove":
            console.log("remove");
            edgeService.removeEdge(change.id);
        }
      }
      setEdges(applyEdgeChanges(changes, edges));
    },
    [setEdges, edges],
  );

  const onConnect = useCallback((connection) => {
    edgeService.addEdge({
      id: generateEdgeId(),
      ...connection,
      type: "bezier",
    });
  }, []);

  const isValidConnection = useCallback(
    (connection) => {
      const sourceNode = nodes.find((n) => n.id === connection.source);
      const targetNode = nodes.find((n) => n.id === connection.target);

      if (!sourceNode || !targetNode) return false;

      const targetType = nodeTypes.find((n) => n.type === targetNode.type);

      return sourceNode.type === targetType?.parent;
    },
    [nodes],
  );

  const onNodeDoubleClick = useCallback(
    (_, node) => {
      if (node.type === "start") return;
      const rf = reactFlowInstanceRef.current;
      if (!rf) return;

      const screen = rf.flowToScreenPosition({
        x: node.position.x + node.width / 2,
        y: node.position.y + node.height / 2,
      });

      openModal(node, screen);
    },
    [openModal, reactFlowInstanceRef],
  );

  const onConnectEnd = useCallback(
    (_, connectionState) => {
      if (connectionState?.toNode || connectionState?.toHandle) return;

      const nextNodeType = nodeTypes.find(
        (n) => n?.parent === connectionState?.fromNode?.type,
      );

      if (!nextNodeType) return;

      const position = screenToFlowPosition({
        x: connectionState.pointer.x - NODE_WIDTH / 2,
        y: connectionState.pointer.y - NODE_HEIGHT / 2,
      });

      const newNodeId = generateNodeId();

      nodeService.addNode({
        id: newNodeId,
        type: nextNodeType.type,
        position,
        data: { label: nextNodeType.type },
      });

      edgeService.addEdge({
        id: generateEdgeId(),
        source: connectionState.fromNode.id,
        target: newNodeId,
        type: "bezier",
      });
    },
    [screenToFlowPosition],
  );

  return {
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,

    onConnect,
    isValidConnection,
    onNodeDoubleClick,
    onConnectEnd,
  };
};

export default useWorkflowInteractions;
