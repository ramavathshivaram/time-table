import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateNodeId = () => `NODE_${nanoid()}`;
export const generateEdgeId = () => `EDGE_${nanoid()}`;
export const generateFacultyId = () => `FACULTY_${nanoid()}`;
export const generateSubjectId = () => `SUBJECT_${nanoid()}`;
export const generateRoomId = () => `ROOM_${nanoid()}`;

export const getNodePosition = (rf, pointer, width = 150, height = 80) => {
  if (!rf || !pointer) return { x: 0, y: 0 };

  return rf.screenToFlowPosition({
    x: pointer.x - width / 2,
    y: pointer.y - height / 2,
  });
};
