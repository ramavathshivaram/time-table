import React, { memo } from "react";
import { Card } from "@/components/ui/card";
import nodeTypes from "../nodeTypes.js";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const NodeLibrary = ({ onDragStart }) => {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="group relative top-15 -left-2 hover:w-full transition-all duration-150">
        <Card className="h-full p-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-2">
            {nodeTypes.map((node) => {
              const Icon = node.icon;

              return (
                <Tooltip key={node.type}>
                  <TooltipTrigger asChild>
                    <div
                      draggable
                      onDragStart={(e) => onDragStart(e, node.type)}
                      className="flex items-center gap-2 cursor-grab p-1 rounded-lg border border-gray-200/60 shadow-sm transition-all hover:bg-muted"
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-md shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </TooltipTrigger>

                  <TooltipContent side="right">
                    <p>{node.title}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default memo(NodeLibrary);
