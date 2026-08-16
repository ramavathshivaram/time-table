import { Handle, Position } from "@xyflow/react";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";
import type { ReactNode } from "react";
import {
  CalendarDays,
  Clock3,
  Users,
  BookOpen,
  DoorOpen,
  Layers3,
} from "lucide-react";

import { designerNodes } from "../../constants";

type DesignerNodeType = keyof typeof designerNodes;

interface DesignerNodeProps {
  type: DesignerNodeType;
  label?: string;
  subLabel?: string;
  selected?: boolean;

  showSource?: boolean;
  showTarget?: boolean;

  sourceConnectable?: boolean;
  targetConnectable?: boolean;

  children?: ReactNode;
}

const DesignerNode = ({
  type,
  label,
  subLabel,
  selected,
  showSource = false,
  showTarget = false,
  sourceConnectable = true,
  targetConnectable = true,
  children,
}: DesignerNodeProps) => {
  const config = designerNodes[type];
  const Icon = config.icon;

  return (
    <div className="group relative w-[250px]">
      {showTarget && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={targetConnectable}
          className="!size-2.5 !border-2 !border-background !bg-muted-foreground opacity-0 transition-all group-hover:opacity-100"
        />
      )}

      <Card
        className={cn(
          "overflow-hidden rounded-xl border bg-background shadow-sm transition-all duration-200",
          "hover:-translate-y-0.5 hover:shadow-lg",
          selected && "border-blue-500 ring-2 ring-blue-500/20 shadow-lg",
        )}
      >
        <div className="p-3">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-lg",
                "border bg-muted/40",
              )}
            >
              <Icon className={cn("size-5", config.color)} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-sm font-semibold">
                  {label || "Untitled"}
                </h3>
              </div>

              {subLabel && (
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                  {subLabel}
                </p>
              )}

              {!subLabel && (
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {config.title}
                </p>
              )}
            </div>
          </div>

          {children && <div className="mt-3 border-t pt-3">{children}</div>}
        </div>
      </Card>

      {showSource && (
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={sourceConnectable}
          className="!size-2.5 !border-2 !border-background !bg-muted-foreground opacity-0 transition-all group-hover:opacity-100"
        />
      )}
    </div>
  );
};

export default DesignerNode;
