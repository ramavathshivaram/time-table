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

  token: null,

  setUser: (user) => set({ user }),

  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),

  setToken: (token) => set({ token }),

  login: async (userData) => {
    try {
      const { user, token } = await loginApi(userData);

      set({ user: user, isAuthenticated: true, token: token });
    } catch (error) {
      set({ user: null, isAuthenticated: false, token: null });

      console.error(error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const { user, token } = await registerApi(userData);

      set({ user: user, isAuthenticated: true, token: token });
    } catch (error) {
      set({ user: null, isAuthenticated: false, token: null });
      throw error;
    }
  },

  googleLogin: async (accessToken) => {
    try {
      const { user, token } = await googleLoginApi({ accessToken });
      set({ user: user, isAuthenticated: true, token: token });
    } catch (error) {
      set({ user: null, isAuthenticated: false, token: null });
      console.error(error);
      throw error;
    }
  },

  googleRegister: async (accessToken) => {
    try {
      const { user, token } = await googleRegisterApi({ accessToken });

      set({ user: user, isAuthenticated: true, token: token });
    } catch (error) {
      set({ user: null, isAuthenticated: false, token: null });
      throw error;
    }
  },

  logout: async () => {
    try {
      await logoutApi();
      set({ user: null, isAuthenticated: false, token: null });
    } catch (error) {
      console.error(error);
    } finally {
      set({ user: null, isAuthenticated: false, token: null });
    }
  },

  authCheck: async () => {
    try {
      await authCheckApi();
      set({ isAuthenticated: true });
    } catch (error) {
      console.error(error);
      set({ user: null, isAuthenticated: false, token: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

export default useAuthStore;
