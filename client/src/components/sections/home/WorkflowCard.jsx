import React from "react";
import { Workflow, ArrowRight, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const WorkflowCard = ({ workflow }) => {
  const navigate = useNavigate();

  const createdAgo = formatDistanceToNow(new Date(workflow.createdAt), {
    addSuffix: true,
  });

  return (
    <div
      onClick={() => navigate(`/workflow/${workflow._id}`)}
      className="
        group relative overflow-hidden
        rounded-2xl border border-border/50
        surface-muted backdrop-blur-sm
        p-5
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        cursor-pointer
      "
    >
      {/* Hover Glow */}
      <div
        className="
        absolute inset-0 opacity-0 group-hover:opacity-100
        bg-gradient-to-br from-white/5 to-transparent
        transition
        pointer-events-none
      "
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="
            p-2.5 rounded-xl
            bg-surface-muted/10
            group-hover:bg-surface-muted/20
            transition
          "
          >
            <Workflow size={18} />
          </div>

          <h2 className="text-base font-semibold line-clamp-1">
            {workflow.title}
          </h2>
        </div>

        {/* Actions (hover only) */}
        <div
          className="
          flex items-center gap-2
          opacity-0 group-hover:opacity-100
          transition
        "
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Delete", workflow._id);
            }}
            className="
              p-2 rounded-lg
              hover:bg-red-500/10 hover:text-red-500
              transition
            "
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>{createdAgo.replace("about", "")}</span>

        <span className="flex items-center gap-1 group-hover:gap-2 transition-all">
          Open
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </div>
  );
};

export default WorkflowCard;
