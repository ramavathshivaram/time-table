import React, { memo, useCallback } from "react";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";

import nodeTypes from "../nodeTypes.js";

const NodeLibrary = () => {
  const onDragStart = useCallback((e, type) => {
    e.dataTransfer.setData("application/reactflow", type);
    e.dataTransfer.effectAllowed = "move";
  }, []);

  return (
    <div className="group w-15  relative top-15 -left-2 hover:w-full transition-all duration-150">
      <Card className="h-full p-1 flex flex-col border shadow-sm">
        {/* Node list */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {nodeTypes.map((node) => {
            const Icon = node.icon;

            return (
              <div
                key={node.type}
                draggable
                onDragStart={(e) => onDragStart(e, node.type)}
                className="flex items-center gap-2 cursor-grab p-1 rounded-lg border border-gray-200/60 bg-white hover:bg-gray-100 shadow-sm transition-all active:scale-[0.98]"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md shrink-0">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>

                <div className="hidden group-hover:block transition-all delay-100 overflow-hidden truncate">
                  <div className="text-sm font-medium text-gray-800">
                    {node.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {node.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default memo(NodeLibrary);
