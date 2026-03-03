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

import { toast } from "sonner";

const iconBtnClass =
  "h-9 w-9 p-0 flex items-center justify-center rounded-md transition-all duration-200";

const WorkflowControls = ({ autoArrangement, duplicateSelected }) => {
  const controls = [
    {
      icon: Trash2,
      label: "Delete Selected",
      className:
        "text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300",
      onClick: () => toast.error("Delete not implemented"),
    },
    {
      icon: Copy,
      label: "Duplicate",
      className:
        "text-blue-500 border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300",
      onClick: duplicateSelected,
    },
    {
      icon: ArrowDownNarrowWide,
      label: "Auto Arrange",
      className:
        "text-purple-500 border-purple-200 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-300",
      onClick: autoArrangement,
    },
  ];

  return (
    <TooltipProvider delayDuration={150}>
      <Card className="flex items-center p-1 shadow-md bg-white border">
        <div className="flex items-center gap-2">
          {controls.map((control) => {
            const Icon = control.icon;

            return (
              <Tooltip key={control.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`${iconBtnClass} ${control.className}`}
                    onClick={control.onClick}
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