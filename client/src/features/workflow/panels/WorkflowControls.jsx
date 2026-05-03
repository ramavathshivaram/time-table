import React, { memo, useEffect, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  CheckSquare,
  Copy,
  ArrowDownNarrowWide,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize,
  Undo2,
  Redo2,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { toast } from "sonner";
import { useReactFlow } from "@xyflow/react";

import useDuplicateSelected from "../workflows-hooks/controllers/useDuplicateSelected.js";
import useAutoArrange from "../workflows-hooks/controllers/useAutoArrange.js";
import useDeleteSelected from "../workflows-hooks/controllers/useDeleteSelected.js";
import useSelectAll from "../workflows-hooks/controllers/useSelectAll.js";

import { cn } from "@/lib/utils.js";

const iconBtnClass =
  "h-9 w-9 p-0 flex items-center justify-center rounded-md transition-all duration-200";

const WorkflowControls = () => {
  const { zoomIn, zoomOut, fitView, getNodes, getEdges, setNodes, setEdges } =
    useReactFlow();

  /* ------------------ Hooks ------------------ */
  const duplicateSelected = useDuplicateSelected({ getNodes, getEdges });
  const autoArrangement = useAutoArrange({ getNodes, getEdges, setNodes });
  const deleteSelected = useDeleteSelected({
    getNodes,
    getEdges,
    setNodes,
    setEdges,
  });
  const handleSelectAll = useSelectAll({ setNodes, setEdges });

  /* ------------------ Selection State ------------------ */
  const hasSelection = useMemo(() => {
    return getNodes().some((n) => n.selected);
  }, [getNodes]);

  /* ------------------ Controls ------------------ */
  const controls = useMemo(
    () => [
      {
        icon: CheckSquare,
        label: "Select All",
        className:
          "text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600",
        onClick: handleSelectAll,
      },
      {
        icon: Trash2,
        label: "Delete Selected",
        className:
          "text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600",
        onClick: deleteSelected,
        disabled: !hasSelection,
      },
      {
        icon: Copy,
        label: "Duplicate",
        className:
          "text-blue-500 border-blue-200 hover:bg-blue-50 hover:text-blue-600",
        onClick: duplicateSelected,
        disabled: !hasSelection,
      },
      {
        icon: ArrowDownNarrowWide,
        label: "Auto Arrange",
        className:
          "text-purple-500 border-purple-200 hover:bg-purple-50 hover:text-purple-600",
        onClick: () => {
          autoArrangement();
          fitView();
        },
      },
      {
        icon: ZoomIn,
        label: "Zoom In",
        className:
          "text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-800",
        onClick: zoomIn,
      },
      {
        icon: ZoomOut,
        label: "Zoom Out",
        className:
          "text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-800",
        onClick: zoomOut,
      },
      {
        icon: Maximize,
        label: "Fit View",
        className:
          "text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600",
        onClick: fitView,
      },
      {
        icon: Undo2,
        label: "Undo",
        className:
          "text-yellow-500 border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600",
        onClick: () => toast.error("Undo not implemented"),
      },
      {
        icon: Redo2,
        label: "Redo",
        className:
          "text-yellow-500 border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600",
        onClick: () => toast.error("Redo not implemented"),
      },
    ],
    [
      handleSelectAll,
      deleteSelected,
      duplicateSelected,
      autoArrangement,
      fitView,
      zoomIn,
      zoomOut,
      hasSelection,
    ]
  );

  /* ------------------ Resize Handling ------------------ */
  useEffect(() => {
    let timer;

    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fitView();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [fitView]);

  /* ------------------ Render ------------------ */
  return (
    <TooltipProvider delayDuration={150}>
      <Card className="flex items-center p-1 relative -top-2 shadow-md border">
        <div className="flex items-center gap-2 flex-wrap">
          {controls.map((control) => {
            const Icon = control.icon;

            return (
              <Tooltip key={control.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={control.disabled}
                    className={cn(iconBtnClass, control.className)}
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

export default memo(WorkflowControls);