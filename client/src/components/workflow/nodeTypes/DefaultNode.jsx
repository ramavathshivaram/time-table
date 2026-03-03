import { Card } from "@/components/ui/card";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import nodeTypes from "../nodeTypes.js";

const DefaultNode = ({ data, isConnectable }) => {
  const node = nodeTypes.find((n) => n.type === data.type) || {};

  const Icon = node.icon;

  return (
    <div className="relative group">
      <Card className=" shadow-md border border-gray-700 rounded-lg p-2 bg-white hover:shadow-lg transition-all">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className={`p-1 rounded-md ${node.bg}`}>
            <Icon className={`w-5 h-5 ${node.color}`} />
          </div>

          <h1 className="text-sm font-semibold text-gray-800">
            {node.label || node.title}
          </h1>
        </div>
      </Card>

      {/* Target Handle (Top) */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-500 border-2 border-white rounded-full 
                   opacity-0 group-hover:opacity-100 transition-all"
      />

      {/* Source Handle (Bottom) */}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-gray-500 border-2 border-white rounded-full 
                   opacity-0 group-hover:opacity-100 transition-all"
      />
    </div>
  );
};

export default DefaultNode;
