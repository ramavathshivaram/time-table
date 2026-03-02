import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createWorkflowApi } from "@/lib/apis/workflow.api.js";

const CreateWorkflowBtn = () => {
  const navigate = useNavigate();

  const handleCreate = async () => {
    const workflow = await createWorkflowApi();

    console.log(workflow);

    navigate(`/workflow/${workflow.id}`);
  };
  return (
    <div>
      <Button size="sm" onClick={handleCreate}>
        Create
      </Button>
    </div>
  );
};

export default CreateWorkflowBtn;
