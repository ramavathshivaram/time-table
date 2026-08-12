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

import { toast } from "sonner";

export const controls = [
  {
    icon: CheckSquare,
    label: "Select All",
    className:
      "text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600",
    onClick: () => toast.info("Select All"),
  },
  {
    icon: Trash2,
    label: "Delete Selected",
    className: "text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600",
    onClick: () => toast.info("Delete Selected"),
  },
  {
    icon: Copy,
    label: "Duplicate",
    className:
      "text-blue-500 border-blue-200 hover:bg-blue-50 hover:text-blue-600",
    onClick: () => toast.info("Duplicate"),
  },
  {
    icon: ArrowDownNarrowWide,
    label: "Auto Arrange",
    className:
      "text-purple-500 border-purple-200 hover:bg-purple-50 hover:text-purple-600",
    onClick: () => toast.info("Auto Arrange"),
  },
  {
    icon: ZoomIn,
    label: "Zoom In",
    className:
      "text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-800",
    onClick: () => toast.info("Zoom In"),
  },
  {
    icon: ZoomOut,
    label: "Zoom Out",
    className:
      "text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-800",
    onClick: () => toast.info("Zoom Out"),
  },
  {
    icon: Maximize,
    label: "Fit View",
    className:
      "text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600",
    onClick: () => toast.info("Fit View"),
  },
  {
    icon: Undo2,
    label: "Undo",
    className:
      "text-yellow-500 border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600",
    onClick: () => toast.info("Undo not implemented"),
  },
  {
    icon: Redo2,
    label: "Redo",
    className:
      "text-yellow-500 border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600",
    onClick: () => toast.info("Redo not implemented"),
  },
];
