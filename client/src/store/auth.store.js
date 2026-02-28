import { create } from "zustand";
import {
  authCheckApi,
  googleLoginApi,
  googleRegisterApi,
  loginApi,
  logoutApi,
  registerApi,
} from "../lib/apis/auth.api.js";

const useAuthStore = create((set) => ({
  user: null,

  isAuthenticated: false,

  isCheckingAuth: true,

  setUser: (user) => set({ user }),

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  login: async (userData) => {
    try {
      const user = await loginApi(userData);

      console.log(user);

      set({ user: user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });

      console.error(error);

      throw error;
    }
  },

  googleLogin: async (accessToken) => {
    try {
      const user = await googleLoginApi({ accessToken });

      console.log(user);

      set({ user: user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });

      console.error(error);

      throw error;
    }
  },

  register: async (userData) => {
    try {
      const user = await registerApi(userData);

      set({ user: user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      throw error;
    }
  },

  googleRegister: async (accessToken) => {
    try {
      const user = await googleRegisterApi({ accessToken });

      set({ user: user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      throw error;
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
      await authCheckApi();
      set({ isAuthenticated: true });
    } catch (error) {
      console.log(error);
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

export default useAuthStore;
