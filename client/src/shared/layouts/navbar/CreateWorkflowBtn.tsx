import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRightIcon } from "lucide-react";

import {
  CraftButton,
  CraftButtonLabel,
  CraftButtonIcon,
} from "@/shared/ui/craft-button";

const CreateWorkflowBtn = () => {
  const navigate = useNavigate();

  const isPending = false;

  const handleCreate = () => {
    navigate("/workflow/create");
  };

  return (
    <CraftButton size="sm" onClick={handleCreate} disabled={isPending}>
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
