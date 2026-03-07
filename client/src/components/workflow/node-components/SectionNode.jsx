import React from "react";
import { Card } from "@/components/ui/card";
import { Handle, Position, useNodeConnections } from "@xyflow/react";
import nodeTypes from "../nodeTypes.js";
import { cn } from "@/lib/utils.js";

const SectionNode = ({ data, type, selected }) => {
  const connections = useNodeConnections({
    handleType: "target",
  });

  const node = nodeTypes.find((n) => n.type === type) || {};
  const Icon = node.icon;

  return (
    <div className="relative group">
      {/* Node */}
      <Card
        className={cn(
          "border border-gray-700 px-3 py-2 rounded-md shadow-sm bg-background transition-all hover:shadow-md",
          selected && "border-blue-500 shadow-md",
        )}
      >
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-lg",
              node.bg,
            )}
          >
            {Icon && <Icon className={cn("w-4 h-4", node.color)} />}
          </div>

          {/* Label */}
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Section</span>
            <span className="text-sm font-semibold leading-none">
              {data.label || "Untitled"}
            </span>
          </div>
        </div>
      </Card>

      {/* Target Handle */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={connections.length < 1}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
};

export default SectionNode;
