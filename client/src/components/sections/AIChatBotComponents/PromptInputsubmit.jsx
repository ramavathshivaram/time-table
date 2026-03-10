import { InputGroupButton } from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import {
  CornerDownLeftIcon,
  Loader2Icon,
  SquareIcon,
  XIcon,
} from "lucide-react";
import React from "react";

const PromptInputsubmit = ({
  className,
  variant = "default",
  size = "icon-sm",
  status,
  children,
  ...props
}) => {
  let Icon = <CornerDownLeftIcon className="size-4" />;

  if (status === "submitted") {
    Icon = <Loader2Icon className="size-4 animate-spin" />;
  } else if (status === "streaming") {
    Icon = <SquareIcon className="size-4" />;
  } else if (status === "error") {
    Icon = <XIcon className="size-4" />;
  }

  return (
    <div>
      <InputGroupButton
        aria-label="Submit"
        className={cn(className)}
        size={size}
        type="submit"
        variant={variant}
        {...props}
      >
        {children ?? Icon}
      </InputGroupButton>
    </div>
  );
};

export default PromptInputsubmit;
