import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCreateWorkflow } from "@/hooks/react-query/workflow.query.js";
import { Plus } from "lucide-react";

const CreateWorkflowBtn = () => {
  const navigate = useNavigate();

  const { mutateAsync: createWorkflow, isPending } = useCreateWorkflow();

  const handleCreate = async () => {
    try {
      const workflow = await createWorkflow();

      navigate(`/workflow/${workflow.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      size="sm"
      onClick={handleCreate}
      disabled={isPending}
      className="flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
    >
      <Plus size={16} />
      {isPending ? "Creating..." : "Create"}
    </Button>
  );
};

export default CreateWorkflowBtn;