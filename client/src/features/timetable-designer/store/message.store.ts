import { create } from "zustand";

import type { Message } from "../types";

interface MessageState {
  messages: Message[];
  isLoading: boolean;

  send: (msg: Message) => void;
  receive: (msg: Message) => void;
  update: (id: string, content: string) => void;
  start: () => void;
  finish: () => void;
  clear: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  isLoading: false,

  send: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
      isLoading: true,
    })),

  receive: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  update: (id, content) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === id
          ? {
              ...message,
              content: message.content + content,
            }
          : message,
      ),
    })),

  start: () =>
    set({
      isLoading: true,
    }),

  finish: () =>
    set({
      isLoading: false,
    }),

  clear: () =>
    set({
      messages: [],
      isLoading: false,
    }),
}));
