import { userApi } from "./user.api";
import { useUserStore } from "./user.store";

export const userService = {
  getCurrentUser: async () => {
    const { data: response } = await userApi.getCurrentUser();

    useUserStore.getState().setUser(response.user);

    return response.user;
  },
};
