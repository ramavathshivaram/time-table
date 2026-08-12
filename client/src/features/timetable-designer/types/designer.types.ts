import type {
  Connection,
  EdgeChange,
  NodeChange,
  OnConnectEnd,
} from "@xyflow/react";
import type { IsValidConnection } from "@xyflow/system";

export type Node = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { label: string; type?: string };
};

export type Edge = {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
};

export type Faculties = {
  id: string;
};
export type Subjects = {
  id: string;
};
export type Rooms = {
  id: string;
};
export type Messages = {
  id: string;
};

export type Designer = {
  nodes: Node[];
  edges: Edge[];
};

export type Interactions = {
  nodes: Node[];
  edges: Edge[];

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;

  onConnect: (connection: Connection) => void;

  onNodeDoubleClick: (event: React.MouseEvent, node: Node) => void;

  onConnectEnd: OnConnectEnd;

  isValidConnection: IsValidConnection;
};
