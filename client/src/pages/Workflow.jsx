import WorkflowEditor from "@/components/workflow/WorkflowEditor";
import { useGetWorkflowDetails } from "@/hooks/react-query/workflow.query.js";
import { ReactFlowProvider } from "@xyflow/react";
import React from "react";
import { useParams } from "react-router-dom";

const Workflow = () => {
  const workflowId = useParams().workflowId;

  const { data: initialWorkflowData, isLoading } =
    useGetWorkflowDetails(workflowId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <ReactFlowProvider>
        <WorkflowEditor
          initialWorkflowData={initialWorkflowData}
          workflowId={workflowId}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default Workflow;
