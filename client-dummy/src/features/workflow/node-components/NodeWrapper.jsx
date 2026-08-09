import React from "react";
import { Card } from "@/components/ui/card";
import { Handle, Position } from "@xyflow/react";
import { cn } from "@/lib/utils.js";

const NodeWrapper = ({
  icon: Icon,
  iconColor,
  label,
  subLabel,
  selected,
  showSource = false,
  showTarget = false,
  isConnectable = true,
  targetConnectable = true,
}) => {
  return (
    <div className="relative group">
      <Card
        className={cn(
          "border border-gray-700 px-2 py-1 rounded-md shadow-sm bg-background transition-all hover:shadow-md",
          selected && "border-blue-500 shadow-md",
        )}
      >
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div className="flex items-center justify-center w-6 h-6 p-0.5 rounded-sm border">
            {Icon && <Icon className={cn("w-5 h-5", iconColor)} />}
          </div>

          {/* Label */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none capitalize">
              {label || "Untitled"}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {subLabel}
            </span>
          </div>
        </div>
      </Card>

      {/* Target Handle */}
      {showTarget && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={targetConnectable}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}

      {/* Source Handle */}
      {showSource && (
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      )}
    </div>
  );
};

export default NodeWrapper;