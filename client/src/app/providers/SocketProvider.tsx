import { useEffect, type ReactNode } from "react";

import { socketService } from "@/shared/socket/socket.service";
import { useSocketStore } from "@/shared/socket/socket.store";
import ConnectingScreen from "@/shared/components/ConnectingScreen";

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
    };

    const handleConnectError = () => {
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
