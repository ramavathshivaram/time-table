import { create } from "zustand";
import {
  authCheckApi,
  loginApi,
  logoutApi,
  registerApi,
} from "../lib/apis/auth.api.js";

const useUserStore = create((set) => ({
  user: null,

  isAuthenticated: false,

  setUser: (user) => set({ user }),

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  login: async (user) => {
    try {
      const response = await loginApi(user);

      console.log(response);

      set({ user: response, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });

      console.error(error);
    }
  },

  register: async (user) => {
    try {
      console.log(user);
      const response = await registerApi(user);

      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });

      console.error(error);
    }
  },

  logout: async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.log(error);
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },

  authCheck: async () => {
    try {
      const response = await authCheckApi();
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      console.log(error);
      set({ user: null, isAuthenticated: false });
    }
  },
}));

export default useUserStore;
