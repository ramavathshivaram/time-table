import { Card } from "@/components/ui/card";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import nodeTypes from "../nodeTypes.js";
import { cn } from "@/lib/utils.js";

const DefaultNode = ({ data, isConnectable, type, selected }) => {
  const node = nodeTypes.find((n) => n.type === type) || {};
  const Icon = node.icon;

  return (
    <div className="relative group">
      {/* Node */}
      <Card
        className={cn(
          "border border-gray-700 px-2 py-1 rounded-md shadow-sm bg-background transition-all hover:shadow-md",
          selected && "border-blue-500 shadow-md",
        )}
      >
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div
            className={cn(
              "flex items-center justify-center w-6 h-6 rounded-sm",
              node.bg,
            )}
          >
            {Icon && <Icon className={cn("w-5 h-5", node.color)} />}
          </div>

          {/* Label */}
          <div className="flex flex-col">

            <span className="text-sm font-semibold leading-none capitalize">
              {data.label || "Untitled"}
            </span>

            <span className="text-[10px] text-muted-foreground">
              {node.label || node.title}
            </span>
          </div>
        </div>
      </Card>

      {/* Target Handle */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      />

      {/* Source Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </div>
  );
};

export default DefaultNode;
