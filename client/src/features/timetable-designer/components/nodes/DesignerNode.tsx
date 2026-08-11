import { Handle, Position } from "@xyflow/react";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/card";
import type { LucideIcon } from "lucide-react";

interface DesignerNodeProps {
  icon?: LucideIcon;
  iconColor?: string;
  label?: string;
  subLabel?: string;
  selected?: boolean;

  showSource?: boolean;
  showTarget?: boolean;

  sourceConnectable?: boolean;
  targetConnectable?: boolean;

  children?: React.ReactNode;
}

const DesignerNode = ({
  icon: Icon,
  iconColor,
  label,
  subLabel,
  selected,

  showSource = false,
  showTarget = false,

  sourceConnectable = true,
  targetConnectable = true,

  children,
}: DesignerNodeProps) => {
  return (
    <div className="group relative">
      {showTarget && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={targetConnectable}
          className="opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}

      <Card
        className={cn(
          "rounded-md border border-gray-700 bg-background px-2 py-1 shadow-sm transition-all hover:shadow-md",
          selected && "border-blue-500 shadow-md",
        )}
      >
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="flex size-6 shrink-0 items-center justify-center rounded-sm border p-0.5">
              <Icon className={cn("size-5", iconColor)} />
            </div>
          )}

          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold leading-none">
              {label || "Untitled"}
            </span>

            {subLabel && (
              <span className="text-[10px] text-muted-foreground">
                {subLabel}
              </span>
            )}
          </div>
        </div>

        {children}
      </Card>

      {showSource && (
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={sourceConnectable}
          className="opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </div>
  );
};

export default DesignerNode;
