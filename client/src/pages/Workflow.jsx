import React from "react";
import { useSearchParams } from "react-router-dom";

const Workflow = () => {
  const newWorkflow = useSearchParams()[0].get("newWorkflow");
  const workflowId = useSearchParams()[0].get("workflowId");

  if (workflowId) {
    return <div>workflow {workflowId}</div>;
  }

  // use sockets

  return (
    <div>
      workflow
      {newWorkflow && "new workflow"}
    </div>
  );
};

export default Workflow;
