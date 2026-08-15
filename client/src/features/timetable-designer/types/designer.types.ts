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
  selected?: boolean;
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

export interface Faculty {
  id: string;
  name: string;
  email: string;

  employeeId?: string;
  department?: string;
  designation?: string;

  subjectIds: string[];

  availability?: {
    workingDays: string[];
    startTime: string;
    endTime: string;

    unavailableSlots: {
      day: string;
      startTime: string;
      endTime: string;
    }[];
  };
}

export interface Subject {
  id: string;
  name: string;
  code: string;

  duration: number;
  credits: number;

  isLab: boolean;

  weeklyPeriods: number;
  periodsPerDay?: number;
  consecutivePeriods?: number;

  facultyIds: string[];

  roomRequirements?: {
    type: "classroom" | "laboratory" | "seminar-hall";
    minimumCapacity?: number;
    facilities: string[];
  };
}

export interface Room {
  id: string;
  name: string;
  roomNumber: string;

  capacity: number;
  floor: number;

  isLab: boolean;

  facilities: string[];

  availability?: {
    workingDays: string[];
    startTime: string;
    endTime: string;

    unavailableSlots: {
      day: string;
      startTime: string;
      endTime: string;
    }[];
  };
}

export interface Message {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  createdAt: string;
}

export type Designer = {
  faculties: Faculty[];
  subjects: Subject[];
  rooms: Room[];
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
