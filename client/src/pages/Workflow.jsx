import WorkflowEditor from "@/components/workflow/WorkflowEditor";
import { useGetWorkflowDetails } from "@/hooks/react-query/workflow.query.js";
import { getSocket } from "@/services/socket/socket.js";
import initSocketListeners from "@/services/socket/workflow/listeners/initListeners.js";
import useWorkflowStore from "@/store/workflow.store";
import { ReactFlowProvider } from "@xyflow/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Workflow = () => {
  const init = useWorkflowStore((s) => s.init);
  const clear = useWorkflowStore((s) => s.clear);
  const { workflowId } = useParams();

  const { data: initialWorkflowData, isLoading } =
    useGetWorkflowDetails(workflowId);

  useEffect(() => {
    const socket = getSocket();

    if (!socket.connected) socket.connect();
  }, [workflowId]);

  useEffect(() => {
    if (initialWorkflowData) {
      init(initialWorkflowData);
    }

    return () => {
      clear();
    };
  }, [initialWorkflowData, init, workflowId, clear]);

  useEffect(() => {
    initSocketListeners();
  }, []);

  if (isLoading) return <div>Loading...</div>;

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
