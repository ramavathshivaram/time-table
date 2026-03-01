import { create } from "zustand";
import { getUserDetailsApi } from "../lib/apis/user.api.js";

const useUserStore = create((set) => ({
  user: null,

  notifications: [],

  darkMode: false,

  setUser: (user) =>
    set({
      user,
      notifications: user.notifications,
      darkMode: user.settings.darkMode,
    }),

  setNotifications: (notifications) => set({ notifications }),

  setDarkMode: (darkMode) => set({ darkMode }),

  clearUser: () => set({ user: null, notifications: [], darkMode: false }),

  fetchUser: async () => {
    const user = await getUserDetailsApi();

    set({
      user,
      notifications: user.notifications,
      darkMode: user?.settings?.darkMode || false,
    });
  },
}));

export default useUserStore;
