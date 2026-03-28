import React from "react";
import { Workflow, ArrowRight, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const RecentWorkflowCard = ({ workflow }) => {
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
        bg-surface-muted/5 backdrop-blur-sm p-2.5
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1
        cursor-pointer
      "
    >
      {/* Glow Hover Effect */}
      <div
        className="
        absolute inset-0 opacity-0 group-hover:opacity-100
        transition duration-300
        bg-gradient-to-br from-white/5 to-transparent
        pointer-events-none
      "
      />

      {/* Top Section */}
      <div className="flex items-start justify-between">
        {/* Left */}
        <div className="flex items-center gap-1">
          <div
            className="
            p-2 rounded-xl
            bg-surface-muted/10
            group-hover:bg-surface-muted/20
            transition
          "
          >
            <Workflow size={18} />
          </div>

          <div>
            <h2 className="text-base font-semibold leading-tight line-clamp-1">
              {workflow.title}
            </h2>
            <p className="text-xs text-muted-foreground">Workflow</p>
          </div>
        </div>

        {/* Right Actions */}
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
              hover:bg-red-500/10
              hover:text-red-500
              transition
            "
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Bottom subtle info */}
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>{createdAgo.replace("about", "")}</span>
        <span>Open →</span>
      </div>
    </div>
  );
};

export default RecentWorkflowCard;
