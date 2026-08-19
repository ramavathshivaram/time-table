import { useEffect, type ReactNode } from "react";

import { socketService } from "@/shared/socket/socket.service";
import { useSocketStore } from "@/shared/socket/socket.store";
import ConnectingScreen from "@/shared/components/ConnectingScreen";
import { toast } from "sonner";
import { authService } from "@/features/auth/services/auth.service";
import { navigationService } from "@/shared/services/navigation.service";

interface Props {
  children: ReactNode;
}

const SocketProvider = ({ children }: Props) => {
  const status = useSocketStore((state) => state.status);
  const setStatus = useSocketStore((state) => state.setStatus);

  useEffect(() => {
    const socket = socketService.getSocket();

    const handleConnect = () => {
      setStatus("connected");
    };

    const handleDisconnect = () => {
      setStatus("disconnected");
      // navigationService.navigate("/timetables");
    };

    const handleConnectError = async (err: Error) => {
      console.error("Socket connection error:", err);

      if (err.message === "Forbidden") {
        try {
          await authService.refreshToken();

          socketService.updateToken();
          socketService.connect();

          return;
        } catch {
          toast.error("Session expired. Please login again.");
          setStatus("disconnected");
          return;
        }
      }

      toast.error(err.message);
      setStatus("reconnecting");
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    setStatus("connecting");

    socketService.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);

      socketService.disconnect();
    };
  }, [setStatus]);

  if (
    status === "connecting" ||
    (status === "reconnecting" && !socketService.getSocket().active)
  ) {
    return <ConnectingScreen />;
  }

  return children;
};

export default SocketProvider;
