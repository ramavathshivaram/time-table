import useSocket from "@/hooks/socket/useSocket.js";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Workflow = () => {
  const [searchParams] = useSearchParams();

  const newWorkflow = searchParams.get("newWorkflow");
  const workflowId = searchParams.get("workflowId");

  const { socket, connectSocket, disconnectSocket } = useSocket();

  useEffect(() => {
    connectSocket();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    return () => {
      socket.off("connect");
      disconnectSocket();
    };
  }, []);

  return (
    <div>
      workflow
      {newWorkflow && "new workflow"}
    </div>
  );
};

export default Workflow;