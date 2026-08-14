import { memo } from "react";

import { Card } from "@/shared/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";

import { designerNodes } from "../../constants";
import { useDesignerDnD } from "../../hooks";

const NodePalette = () => {
  const { onDragStart } = useDesignerDnD();

  return (
    <TooltipProvider delay={150}>
      <div className="group relative top-15 -left-2 transition-all duration-150 hover:w-full">
        <Card className="flex h-full p-1">
          <div className="flex flex-1 flex-col space-y-1">
            {Object.entries(designerNodes).map(([type, node]) => {
              const Icon = node.icon;

              return (
                <Tooltip key={type}>
                  <TooltipTrigger>
                    <div
                      draggable
                      onDragStart={(event) => onDragStart(event, type)}
                      className="flex cursor-grab items-center gap-2 rounded-lg border p-1 shadow-sm transition-all hover:bg-muted active:cursor-grabbing"
                    >
                      <div className="rounded-md p-0.5">
                        <Icon className={`size-7 ${node.color}`} />
                      </div>
                    </div>
                  </TooltipTrigger>

                  <TooltipContent side="right">{node.title}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default memo(NodePalette);
