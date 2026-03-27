import { refreshTokenApi } from "@/lib/apis/auth.api.js";
import useAuthStore from "@/store/auth.store.js";
import { getSocket } from "./socket.js";

const handleSocketAuthError = async () => {
  try {
    const token = await refreshTokenApi();

    useAuthStore.getState().setToken(token);

    const socket = getSocket();
    socket.auth = { token };

    socket.connect();
  } catch (err) {
    console.log("❌ Refresh failed", err);
    useAuthStore.getState().clear();
  }
};

export default handleSocketAuthError;
