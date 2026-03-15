import React from "react";
import { Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Handle, Position } from "@xyflow/react";
import { cn } from "@/lib/utils.js";

const StartNode = ({ data, isConnectable, selected }) => {
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
          <div className="flex items-center justify-center w-6 h-6 p-0.5 rounded-sm border">
            <Play className="w-5 h-5 text-green-600" />
          </div>

          {/* Label */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none capitalize">
              {data.label || "Untitled"}
            </span>
            <span className="text-[10px] text-muted-foreground">Start</span>
          </div>
        </div>
      </Card>

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

export default StartNode;
