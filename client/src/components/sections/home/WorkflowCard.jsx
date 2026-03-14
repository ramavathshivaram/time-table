import React from "react";
import { Workflow, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDeleteWorkflow } from "@/hooks/react-query/workflow.query.js";

const WorkflowCard = ({ workflow }) => {
  const navigate = useNavigate();

  const { mutate: deleteWorkflow, isPending } = useDeleteWorkflow();

  const handleDelete = (e) => {
    e.stopPropagation(); // prevents navigation

    if (confirm("Delete this workflow?")) {
      deleteWorkflow({ workflowId: workflow._id });
    }
  };

  return (
    <div
      onClick={() => navigate(`/workflow/${workflow._id}`)}
      className="group rounded-xl border bg-card p-5 shadow-sm 
      hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      {/* Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-muted">
          <Workflow size={18} />
        </div>

        <h2 className="text-lg font-semibold line-clamp-1">{workflow.title}</h2>

        {/* Delete */}
        <button
          className="ml-auto text-muted-foreground hidden group-hover:block hover:text-red-500 transition-all duration-200"
          onClick={handleDelete}
          disabled={isPending}
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Dates */}
      <div className="text-sm text-muted-foreground space-y-1">
        <p>Created: {new Date(workflow.createdAt).toLocaleDateString()}</p>
        <p>Updated: {new Date(workflow.updatedAt).toLocaleDateString()}</p>
      </div>

      {/* Action */}
      <Button
        className="mt-5 w-full flex items-center justify-center gap-2"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/workflow/${workflow._id}`);
        }}
      >
        Open Workflow
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </Button>
    </div>
  );
};

export default WorkflowCard;
