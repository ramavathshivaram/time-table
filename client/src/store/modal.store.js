import { create } from "zustand";

const useModalStore = create((set) => ({
  origin: { x: 0, y: 0 },
  activeNode: null,
  isModalOpen: false,

  openModal: (node, origin) =>
    set({
      activeNode: node,
      origin,
      isModalOpen: true,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      activeNode: null,
    }),
}));

export default useModalStore;
