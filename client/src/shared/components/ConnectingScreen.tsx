import React from "react";
import { useSocketStore } from "../socket/socket.store";

const ConnectingScreen = () => {
  const status = useSocketStore((s) => s.status);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-3 size-6 animate-spin rounded-full border-2 border-muted border-t-primary" />

        <p className="text-sm font-medium">{status}...</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Establishing realtime connection
        </p>
      </div>
    </div>
  );
};

export default ConnectingScreen;
