import { nanoid } from "nanoid";

export const generateNodeId = () => `NODE_${nanoid()}`;
export const generateEdgeId = () => `EDGE_${nanoid()}`;
export const generateFacultyId = () => `FACULTY_${nanoid()}`;
export const generateSubjectId = () => `SUBJECT_${nanoid()}`;
export const generateRoomId = () => `ROOM_${nanoid()}`;
