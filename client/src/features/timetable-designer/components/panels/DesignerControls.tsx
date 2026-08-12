import { memo, useMemo } from "react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/shared/ui/tooltip";

import { cn } from "@/shared/lib/utils";
import { controls } from "../../constants";

const iconButtonClass =
  "h-9 w-9 p-0 flex items-center justify-center rounded-md transition-all duration-200";

const DesignerControls = () => {
  return (
    <TooltipProvider delay={150}>
      <Card className="relative -top-2 flex items-center border p-1 shadow-md">
        <div className="flex flex-wrap items-center gap-2">
          {controls.map((control) => {
            const Icon = control.icon;

            return (
              <Tooltip key={control.label}>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(iconButtonClass, control.className)}
                    onClick={control.onClick}
                  >
                    <Icon className="size-4" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent side="bottom">{control.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default memo(DesignerControls);
