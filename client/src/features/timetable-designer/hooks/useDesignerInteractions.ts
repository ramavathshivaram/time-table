import {
  type Connection,
  type EdgeChange,
  type IsValidConnection,
  type NodeChange,
  type OnConnectEnd,
  useReactFlow,
} from "@xyflow/react";

import type { Interactions, Node } from "../types";

import { useDesignerStore } from "../store/designer.store";
import { useModalStore } from "../store/modal.store";

import { useCallback, useMemo } from "react";

import { nodeService } from "../services/node.service";
import { edgeService } from "../services/edge.service";

import {
  generateEdgeId,
  generateNodeId,
} from "../utils/generate-ids";

import {
  designerNodes,
  NODE_HEIGHT,
  NODE_WIDTH,
} from "../constants";

export const useDesignerInteractions = (): Interactions => {
  const { screenToFlowPosition } = useReactFlow();

  const nodes = useDesignerStore((s) => s.nodes);
  const edges = useDesignerStore((s) => s.edges);

  const openModal = useModalStore((s) => s.open);

  /*
   * --------------------------------
   * Fast node lookup
   * --------------------------------
   */

  const nodeMap = useMemo(() => {
    return Object.fromEntries(
      nodes.map((node) => [node.id, node]),
    );
  }, [nodes]);

  /*
   * --------------------------------
   * Node Changes
   * --------------------------------
   */

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      for (const change of changes) {
        switch (change.type) {
          case "remove":
            nodeService.remove(change.id);
            break;

          case "position":
            if (change.position) {
              nodeService.update(change.id, {
                position: change.position,
              });
            }
            break;
        }
      }
    },
    [],
  );

  /*
   * --------------------------------
   * Edge Changes
   * --------------------------------
   */

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      for (const change of changes) {
        switch (change.type) {
          case "remove":
            edgeService.remove(change.id);
            break;
        }
      }
    },
    [],
  );

  /*
   * --------------------------------
   * Cycle Detection
   * --------------------------------
   */

  const createsCycle = useCallback(
    (
      sourceId: string,
      targetId: string,
    ): boolean => {
      const visited = new Set<string>();

      const dfs = (nodeId: string): boolean => {
        if (nodeId === sourceId) {
          return true;
        }

        if (visited.has(nodeId)) {
          return false;
        }

        visited.add(nodeId);

        return edges
          .filter((edge) => edge.source === nodeId)
          .some((edge) => dfs(edge.target));
      };

      return dfs(targetId);
    },
    [edges],
  );

  /*
   * --------------------------------
   * Connection Validation
   * --------------------------------
   */

  const isValidConnection: IsValidConnection =
    useCallback(
      (connection) => {
        const sourceNode =
          nodeMap[connection.source];

        const targetNode =
          nodeMap[connection.target];

        /*
         * Nodes must exist
         */

        if (!sourceNode || !targetNode) {
          return false;
        }

        /*
         * Prevent self connection
         */

        if (sourceNode.id === targetNode.id) {
          return false;
        }

        /*
         * Source configuration
         */

        const sourceConfig =
          designerNodes[sourceNode.type as keyof typeof designerNodes];

        if (!sourceConfig) {
          return false;
        }

        /*
         * Target configuration
         */

        const targetConfig =
          designerNodes[targetNode.type as keyof typeof designerNodes];

        if (!targetConfig) {
          return false;
        }

        /*
         * Check allowed child
         */

        if (
          !sourceConfig.allowedChildren.includes(
            targetNode.type as never,
          )
        ) {
          return false;
        }

        /*
         * Target can have only one parent
         */

        const alreadyHasParent = edges.some(
          (edge) =>
            edge.target === targetNode.id,
        );

        if (alreadyHasParent) {
          return false;
        }

        /*
         * Check parent rule
         */

        if (
          targetConfig.allowedParent !==
          sourceNode.type
        ) {
          return false;
        }

        /*
         * Prevent cycles
         */

        if (
          createsCycle(
            sourceNode.id,
            targetNode.id,
          )
        ) {
          return false;
        }

        return true;
      },
      [nodeMap, edges, createsCycle],
    );

  /*
   * --------------------------------
   * Connect
   * --------------------------------
   */

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!isValidConnection(connection)) {
        return;
      }

      edgeService.add({
        id: generateEdgeId(),
        ...connection,
        type: "bezier",
      });
    },
    [isValidConnection],
  );

  /*
   * --------------------------------
   * Node Double Click
   * --------------------------------
   */

  const onNodeDoubleClick = useCallback(
    (
      event: React.MouseEvent,
      node: Node,
    ) => {
      event.stopPropagation();

      if (node.type === "start") {
        return;
      }

      openModal("node", node);
    },
    [openModal],
  );

  /*
   * --------------------------------
   * Connect End
   * --------------------------------
   */

  const onConnectEnd: OnConnectEnd =
    useCallback(
      (_, connectionState) => {
        /*
         * Connection ended on an existing node.
         *
         * onConnect() handles that case.
         */

        if (
          connectionState.toNode ||
          connectionState.toHandle
        ) {
          return;
        }

        const sourceNode =
          connectionState.fromNode;

        if (!sourceNode) {
          return;
        }

        /*
         * Source configuration
         */

        const sourceConfig =
          designerNodes[
            sourceNode.type as keyof typeof designerNodes
          ];

        if (!sourceConfig) {
          return;
        }

        /*
         * Find allowed children
         */

        const children =
          sourceConfig.allowedChildren;

        if (
          !children ||
          children.length === 0
        ) {
          return;
        }

        /*
         * Pick first child
         *
         * Later you can show a menu here
         * if multiple children are allowed.
         */

        const nextType = children[0];

        const nextNodeConfig =
          designerNodes[
            nextType as keyof typeof designerNodes
          ];

        if (!nextNodeConfig) {
          return;
        }

        /*
         * Convert screen position
         * → flow position
         */

        const position =
          screenToFlowPosition({
            x: connectionState.pointer.x,
            y: connectionState.pointer.y,
          });

        /*
         * Center node around pointer
         */

        position.x -= NODE_WIDTH / 2;
        position.y -= NODE_HEIGHT / 2;

        /*
         * Generate ID
         */

        const newNodeId =
          generateNodeId();

        /*
         * Create node
         */

        nodeService.add({
          id: newNodeId,
          type: nextType,
          position,
          data: nextNodeConfig.defaultData,
        });

        /*
         * Create edge
         */

        edgeService.add({
          id: generateEdgeId(),
          source: sourceNode.id,
          target: newNodeId,
          type: "bezier",
        });
      },
      [screenToFlowPosition],
    );

  /*
   * --------------------------------
   * Return
   * --------------------------------
   */

  return {
    nodes,
    edges,

    onNodesChange,
    onEdgesChange,

    onConnect,

    onNodeDoubleClick,

    onConnectEnd,

    isValidConnection,
  };
};