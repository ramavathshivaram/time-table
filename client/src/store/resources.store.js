import { create } from "zustand";

const useModalStore = create((set) => ({
  
  isModalOpen: false,

  openModal: (id, type) =>
    set({
     
      isModalOpen: true,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      activeNode: null,
    }),
}));

export default useModalStore;