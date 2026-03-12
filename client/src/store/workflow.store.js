import { create } from "zustand";

const useWorkflowStore = create((set, get) => ({
  workflowId: null,

  setWorkflowId: (workflowId) => set({ workflowId }),
}));

export default useWorkflowStore;
