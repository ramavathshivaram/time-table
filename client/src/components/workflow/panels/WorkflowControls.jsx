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
  "h-9 w-9 p-0 flex items-center justify-center rounded-md transition";

const WorkflowControls = ({ autoArrangement, duplicateSelected }) => {
  const controls = [
    {
      icon: Trash2,
      label: "Delete Selected",
      className: "hover:bg-red-50 hover:text-red-600",
      onClick: () => toast.error("Delete not implemented"),
    },
    {
      icon: Copy,
      label: "Duplicate",
      onClick: duplicateSelected,
    },
    {
      icon: ArrowDownNarrowWide,
      label: "Auto Arrange",
      onClick: autoArrangement,
    },
  ];

  return (
    <TooltipProvider delayDuration={150}>
      <Card className="flex items-center px-2 py-1 shadow-sm">
        <div className="flex items-center gap-2">
          {controls.map((control) => {
            const Icon = control.icon;

            return (
              <Tooltip key={control.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`${iconBtnClass} ${control.className || ""}`}
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
