import { create } from "zustand";

import type { User } from "../types/auth.types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;

  setUser: (user: User | null) => void;
  setAuthenticated: (user: User) => void;
  setCheckingAuth: (value: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  setUser: (user) =>
    set({
      user,
    }),

  setAuthenticated: (user) =>
    set({
      user,
      isAuthenticated: true,
      isCheckingAuth: false,
    }),

  setCheckingAuth: (isCheckingAuth) =>
    set({
      isCheckingAuth,
    }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: false,
    }),
}));
