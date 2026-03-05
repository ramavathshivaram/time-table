import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getUserDetailsApi } from "../lib/apis/user.api.js";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      notifications: [],
      darkMode: false,

      setUser: (user) =>
        set({
          user,
          notifications: user?.notifications || [],
          darkMode: user?.settings?.darkMode || false,
        }),

      setNotifications: (notifications) =>
        set({ notifications }),

      setDarkMode: (darkMode) =>
        set({ darkMode }),

      clearUser: () =>
        set({
          user: null,
          notifications: [],
          darkMode: false,
        }),

      fetchUser: async () => {
        try {
          const user = await getUserDetailsApi();

          set({
            user,
            notifications: user?.notifications || [],
            darkMode: user?.darkMode || false,
          });
        } catch (err) {
          console.error("Failed to fetch user:", err);
        }
      },
    }),
    {
      name: "user-store", // key in localStorage
    }
  )
);

export default useUserStore;