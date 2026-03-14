import WorkflowEditor from "@/components/workflow/WorkflowEditor";
import { useGetWorkflowDetails } from "@/hooks/react-query/workflow.query.js";
import { getSocket } from "@/hooks/socket/socket.js";
import useWorkflowStore from "@/store/workflow.store";
import { ReactFlowProvider } from "@xyflow/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Workflow = () => {
  const init = useWorkflowStore((s) => s.init);
  const { workflowId } = useParams();

  const { data: initialWorkflowData, isLoading } =
    useGetWorkflowDetails(workflowId);

  useEffect(() => {
    const socket = getSocket();

    if (!socket.connected) socket.connect();
  }, [workflowId]);

  useEffect(() => {
    if (initialWorkflowData) {
      init(workflowId, initialWorkflowData.nodes, initialWorkflowData.edges);
    }
  }, [initialWorkflowData, init, workflowId]);

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
