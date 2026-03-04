import React from "react";
import { Card } from "@/components/ui/card";
import { Handle, Position } from "@xyflow/react";
import nodeTypes from "../nodeTypes.js";

const SubjectNode = ({ data, isConnectable }) => {
  const node = nodeTypes.find((n) => n.type === data.type) || {};
  const Icon = node.icon;

  return (
    <div className="relative group">

      {/* Node */}
      <Card className="min-w-37.5 border border-gray-700 px-3 py-2 rounded-md shadow-sm bg-background hover:shadow-md transition-all">
        <div className="flex items-center gap-2">

          {/* Icon */}
          <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${node.bg}`}>
            {Icon && <Icon className={`w-4 h-4 ${node.color}`} />}
          </div>

          {/* Label */}
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Subject</span>
            <span className="text-sm font-semibold leading-none">{data.label || "Untitled"}</span>
          </div>

        </div>
      </Card>

      {/* Target Handle */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-4 h-4 bg-blue-500 border-2 border-white dark:border-black rounded-full opacity-0 group-hover:opacity-100 transition"
      />

    </div>
  );
};

export default SubjectNode;