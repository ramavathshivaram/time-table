import { create } from "zustand";

const useWorkflowStore = create((set) => ({
  workflowId: null,
  nodes: [],
  edges: [],
  faculties: [],
  subjects: [],
  rooms: [],
  messages: [],

  init: (data) =>
    set({
      workflowId: data._id,
      nodes: data.nodes,
      edges: data.edges,
      faculties: data.faculties,
      subjects: data.subjects,
      rooms: data.rooms,
      messages: data.messages,
    }),

  clear: () =>
    set({
      nodes: [],
      edges: [],
      faculties: [],
      subjects: [],
      rooms: [],
      messages: [],
    }),

  //! NODES STATE
  setNodes: (nodes) =>
    set((state) => ({
      nodes: typeof nodes === "function" ? nodes(state.nodes) : nodes,
    })),

  addNodeLocal: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),

  removeNodeLocal: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== nodeId),
    })),

  updateNodeLocal: (nodeId, nodeData) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId ? { ...n, data: nodeData } : n
      ),
    })),

  //! EDGES STATE
  setEdges: (edges) =>
    set((state) => ({
      edges: typeof edges === "function" ? edges(state.edges) : edges,
    })),

  addEdgeLocal: (edge) =>
    set((state) => ({
      edges: [...state.edges, edge],
    })),

  removeEdgeLocal: (edgeId) =>
    set((state) => ({
      edges: state.edges.filter((e) => e.id !== edgeId),
    })),

  //! FACULTIES
  setFaculties: (faculties) => set({ faculties }),

  addFacultyLocal: (faculty) =>
    set((state) => ({
      faculties: [...state.faculties, faculty],
    })),

  removeFacultyLocal: (facultyId) =>
    set((state) => ({
      faculties: state.faculties.filter((f) => f.id !== facultyId),
    })),

  //! SUBJECTS
  setSubjects: (subjects) => set({ subjects }),

  addSubjectLocal: (subject) =>
    set((state) => ({
      subjects: [...state.subjects, subject],
    })),

  //! ROOMS
  setRooms: (rooms) => set({ rooms }),

  addRoomLocal: (room) =>
    set((state) => ({
      rooms: [...state.rooms, room],
    })),

  //! MESSAGES
  addMessageLocal: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));

export default useWorkflowStore;