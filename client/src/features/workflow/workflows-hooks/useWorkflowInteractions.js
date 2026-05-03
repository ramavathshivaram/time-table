import {
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useMemo } from "react";

import nodeTypes from "../nodeTypes.js";
import useModalStore from "@/store/modal.store.js";
import useWorkflowStore from "@/store/workflow.store.js";

import nodeService from "@/services/workflow/node.service.js";
import edgeService from "@/services/workflow/edge.service.js";

import { generateEdgeId, generateNodeId } from "@/lib/utils.js";
import useNodeUpdateDebounce from "./useNodeUpdateDebounce.js";

const NODE_WIDTH = 150;
const NODE_HEIGHT = 80;

/* ------------------ Node Type Map ------------------ */
export const nodeTypeMap = Object.fromEntries(
  nodeTypes.map((n) => [n.type, n])
);

const useWorkflowInteractions = (reactFlowInstanceRef) => {
  const openModal = useModalStore((s) => s.openModal);

  const nodes = useWorkflowStore((s) => s.nodes);
  const setNodes = useWorkflowStore((s) => s.setNodes);

  const edges = useWorkflowStore((s) => s.edges);
  const setEdges = useWorkflowStore((s) => s.setEdges);

  const nodeUpdateDebounce = useNodeUpdateDebounce();

  const { screenToFlowPosition } = useReactFlow();

  /* ------------------ Fast Lookup Map ------------------ */
  const nodeMap = useMemo(() => {
    return Object.fromEntries(nodes.map((n) => [n.id, n]));
  }, [nodes]);

  /* ------------------ Nodes Change ------------------ */
  const onNodesChange = useCallback(
    (changes) => {
      for (let change of changes) {
        switch (change.type) {
          case "remove":
            nodeService.removeNode(change.id);
            break;

          case "position":
            nodeUpdateDebounce(change.id, change.position);
            break;
        }
      }

      setNodes(applyNodeChanges(changes, nodes));
    },
    [setNodes, nodes, nodeUpdateDebounce]
  );

  /* ------------------ Edges Change ------------------ */
  const onEdgesChange = useCallback(
    (changes) => {
      for (let change of changes) {
        if (change.type === "remove") {
          edgeService.removeEdge(change.id);
        }
      }

      setEdges(applyEdgeChanges(changes, edges));
    },
    [setEdges, edges]
  );

  /* ------------------ Cycle Detection ------------------ */
  const createsCycle = useCallback(
    (sourceId, targetId) => {
      const visited = new Set();

      const dfs = (nodeId) => {
        if (nodeId === sourceId) return true;

        visited.add(nodeId);

        return edges
          .filter((e) => e.source === nodeId)
          .some(
            (e) => !visited.has(e.target) && dfs(e.target)
          );
      };

      return dfs(targetId);
    },
    [edges]
  );

  /* ------------------ Validation ------------------ */
  const isValidConnection = useCallback(
    (connection) => {
      const sourceNode = nodeMap[connection.source];
      const targetNode = nodeMap[connection.target];

      if (!sourceNode || !targetNode) return false;

      const sourceConfig = nodeTypeMap[sourceNode.type];
      const targetConfig = nodeTypeMap[targetNode.type];

      if (!sourceConfig || !targetConfig) return false;

      // ✅ Rule 1: Allowed children
      if (!sourceConfig.children.includes(targetNode.type)) {
        return false;
      }

      // ✅ Rule 2: Only one parent
      if (edges.some((e) => e.target === targetNode.id)) {
        return false;
      }

      // ✅ Rule 3: No self connect
      if (sourceNode.id === targetNode.id) return false;

      // ✅ Rule 4: No cycles
      if (createsCycle(sourceNode.id, targetNode.id)) {
        return false;
      }

      return true;
    },
    [nodeMap, edges, createsCycle]
  );

  /* ------------------ Connect ------------------ */
  const onConnect = useCallback(
    (connection) => {
      if (!isValidConnection(connection)) return;

      edgeService.addEdge({
        id: generateEdgeId(),
        ...connection,
        type: "bezier",
      });
    },
    [isValidConnection]
  );

  /* ------------------ Double Click ------------------ */
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
    [openModal, reactFlowInstanceRef]
  );

  /* ------------------ Connect End (Auto Create Node) ------------------ */
  const onConnectEnd = useCallback(
    (_, connectionState) => {
      if (connectionState?.toNode || connectionState?.toHandle) return;

      const sourceType = connectionState?.fromNode?.type;
      const sourceConfig = nodeTypeMap[sourceType];

      if (!sourceConfig?.children?.length) return;

      // 👉 pick first allowed child (can be improved later)
      const nextType = sourceConfig.children[0];
      const nextNodeConfig = nodeTypeMap[nextType];

      const position = screenToFlowPosition({
        x: connectionState.pointer.x - NODE_WIDTH / 2,
        y: connectionState.pointer.y - NODE_HEIGHT / 2,
      });

      const newNodeId = generateNodeId();

      nodeService.addNode({
        id: newNodeId,
        type: nextType,
        position,
        data: nextNodeConfig.defaultData,
      });

      edgeService.addEdge({
        id: generateEdgeId(),
        source: connectionState.fromNode.id,
        target: newNodeId,
        type: "bezier",
      });
    },
    [screenToFlowPosition]
  );

  /* ------------------ Return ------------------ */
  return {
    nodes,
    edges,

    onNodesChange,
    onEdgesChange,

    onConnect,
    isValidConnection,
    onConnectEnd,

    onNodeDoubleClick,
  };
};

export default useWorkflowInteractions;