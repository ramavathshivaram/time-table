import React from "react";
import { Card } from "@/components/ui/card";
import { Handle, Position, useNodeConnections } from "@xyflow/react";
import nodeTypes from "../nodeTypes.js";

const SectionNode = ({ data, type }) => {
  const connections = useNodeConnections({
    handleType: "target",
  });

  const node = nodeTypes.find((n) => n.type === type) || {};
  const Icon = node.icon;

  return (
    <div className="relative group">
      {/* Node */}
      <Card className=" border border-gray-700 px-3 py-2 rounded-md shadow-sm bg-background hover:shadow-md transition-all">
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg ${node.bg}`}
          >
            {Icon && <Icon className={`w-4 h-4 ${node.color}`} />}
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
        style={{
          width: 16,
          height: 16,
          background: "#3b82f6",
          border: "2px solid white",
          borderRadius: "50%",
          opacity: 0,
          transition: "opacity 0.2s ease",
        }}
      />
    </div>
  );
};

export default SectionNode;
