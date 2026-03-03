import React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, ArrowDownNarrowWide, Trash2 } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const iconBtnClass =
  "h-9 w-9 p-0 flex items-center justify-center rounded-md transition";

const controls = [
  {
    icon: Trash2,
    label: "Delete Selected",
    className: "hover:bg-red-50 hover:text-red-600",
  },
  {
    icon: Copy,
    label: "Duplicate",
  },
  {
    icon: ArrowDownNarrowWide,
    label: "Auto Arrange",
  },
];

const WorkflowControls = () => {
  return (
    <TooltipProvider delayDuration={150}>
      <Card className="flex items-center px-2 py-1 shadow-sm">
        <div className="flex items-center gap-2">
          {controls.map((control, index) => {
            const Icon = control.icon;

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`${iconBtnClass} ${control.className || ""}`}
                  >
                    <Icon className="size-4" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent side="bottom">
                  <p>{control.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default WorkflowControls;