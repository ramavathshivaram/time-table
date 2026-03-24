import WorkflowEditor from "@/features/workflow/WorkflowEditor";
import { useGetWorkflowDetails } from "@/hooks/react-query/workflow.query.js";
import { getSocket } from "@/services/socket/socket.js";
import initSocketListeners from "@/services/socket/workflow/listeners/initListeners.js";
import useWorkflowStore from "@/store/workflow.store";
import { ReactFlowProvider } from "@xyflow/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullScreenLoader from "@/components/common/FullScreenLoader";

const Workflow = () => {
  const init = useWorkflowStore((s) => s.init);
  const clear = useWorkflowStore((s) => s.clear);
  const [isConnected, setIsConnected] = useState(false);
  const { workflowId } = useParams();

  const { data: initialWorkflowData, isLoading } =
    useGetWorkflowDetails(workflowId);

  useEffect(() => {
    const socket = getSocket();

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    socket.connect();
    initSocketListeners();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (initialWorkflowData) {
      init(initialWorkflowData);
    }
  }, [initialWorkflowData, init]);

  useEffect(() => {
    return () => clear();
  }, [clear]);

  if (isLoading || !isConnected || !initialWorkflowData) {
    return <FullScreenLoader />;
  }

  console.log(initialWorkflowData);

  return (
    <ReactFlowProvider>
      <WorkflowEditor
        initialWorkflowData={initialWorkflowData}
        workflowId={workflowId}
      />
    </ReactFlowProvider>
  );
};

export default Workflow;
