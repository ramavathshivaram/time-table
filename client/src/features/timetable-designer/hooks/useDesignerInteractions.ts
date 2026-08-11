import {
  type Connection,
  type EdgeChange,
  type NodeChange,
  type IsValidConnection,
  type OnConnectEnd,
} from "@xyflow/react";

import type { Edge, Node } from "../types";
import { useDesignerStore } from "../store/designer.store";
import { useCallback } from "react";

type Interactions = {
  nodes: Node[];
  edges: Edge[];

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;

  onConnect: (connection: Connection) => void;

  onNodeDoubleClick: (event: React.MouseEvent, node: Node) => void;

  onConnectEnd: OnConnectEnd;

  isValidConnection: IsValidConnection;
};

export const useDesignerInteractions = (): Interactions => {
  const nodes = useDesignerStore((s) => s.nodes);

  const edges = useDesignerStore((s) => s.edges);

  const onNodesChange = useCallback((changes: NodeChange[]) => {}, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {}, []);

  const onConnect = useCallback((connection: Connection) => {}, []);

  const onNodeDoubleClick = useCallback(
    (event: React.MouseEvent, node: Node) => {},
    [],
  );

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {},
    [],
  );

  const isValidConnection: IsValidConnection = useCallback((connection) => {
    return true;
  }, []);

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
