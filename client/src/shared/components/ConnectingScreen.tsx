import React from "react";

const ConnectingScreen = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-3 size-6 animate-spin rounded-full border-2 border-muted border-t-primary" />

        <p className="text-sm font-medium">Connecting...</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Establishing realtime connection
        </p>
      </div>
    </div>
  );
};

export default ConnectingScreen;
