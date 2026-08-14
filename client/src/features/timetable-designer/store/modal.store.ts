import { create } from "zustand";

type ModalData = Node | undefined;

type ModalStore = {
  isOpen: boolean;
  data: ModalData | null;
  type: string;

  open: (type: string, data: ModalData) => void;
  close: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  data: null,
  type: "",

  open: (type: string, data: ModalData) =>
    set({
      isOpen: true,
      data,
      type,
    }),

  close: () =>
    set({
      isOpen: false,
      data: null,
      type: "",
    }),
}));
