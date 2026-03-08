import React from "react";
import { useNavigate } from "react-router-dom";
import { useCreateWorkflow } from "@/hooks/react-query/workflow.query.js";
import { ArrowUpRightIcon } from "lucide-react";

import {
  CraftButton,
  CraftButtonLabel,
  CraftButtonIcon,
} from "@/components/ui/craft-button";

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
    <CraftButton
      size="sm"
      onClick={handleCreate}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      <CraftButtonLabel>
        {isPending ? "Creating..." : "Create Workflow"}
      </CraftButtonLabel>

      <CraftButtonIcon>
        <ArrowUpRightIcon className="size-3 stroke-2 transition-transform duration-500 group-hover:rotate-45" />
      </CraftButtonIcon>
    </CraftButton>
  );
};

export default CreateWorkflowBtn;