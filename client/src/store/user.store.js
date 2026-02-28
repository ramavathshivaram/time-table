import { create } from "zustand";
import { getUserDetailsApi } from "../lib/apis/user.api.js";

const useUserStore = create((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  fetchUser: async () => {
    const user = await getUserDetailsApi();

    console.log(user);

    set({ user });
  },
}));

export default useUserStore;
