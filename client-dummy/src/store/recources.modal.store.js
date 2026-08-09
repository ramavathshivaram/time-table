import { create } from "zustand";

const useResourcesModalStore = create((set) => ({
  isModalOpen: false,
  type: null,
  isNew: false,
  current: null,

  openModal: (type, current, isNew = false) =>
    set({
      type,
      isNew,
      current,
      isModalOpen: true,
    }),

  closeModal: () =>
    set({
      type: null,
      isNew: false,
      current: null,
      isModalOpen: false,
    }),
}));

export default useResourcesModalStore;
