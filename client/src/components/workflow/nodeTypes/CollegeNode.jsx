import React from "react";
import { School } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Handle, Position } from "@xyflow/react";

const CollegeNode = ({ data, isConnectable }) => {

  return (
    <div className="relative group">
      <Card className=" shadow-md border border-gray-700 rounded-lg p-1 bg-white hover:shadow-md transition-all">
        {/* Header */}
        <div className="flex items-center gap-2">
          <div className="p-1 bg-blue-100 rounded-md">
            <School className="w-5 h-5 text-blue-600" />
          </div>
          <h1 className="text-sm font-semibold text-gray-800">
            {data.label || "College"}
          </h1>
        </div>
      </Card>

      {/* Source Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-5 h-5 bg-blue-500 border-2 border-white rounded-full 
                   opacity-0 group-hover:opacity-100 transition-all"
      />
    </div>
  );
};

export default CollegeNode;
