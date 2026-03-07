import React from "react";
import { School } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Handle, Position } from "@xyflow/react";
import { cn } from "@/lib/utils.js";

const CollegeNode = ({ data, isConnectable, selected }) => {
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
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100">
            <School className="w-4 h-4 text-blue-600" />
          </div>

          {/* Label */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-none">
              {data.label || "Untitled"}
            </span>
            <span className="text-xs text-muted-foreground">College</span>
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

export default CollegeNode;
