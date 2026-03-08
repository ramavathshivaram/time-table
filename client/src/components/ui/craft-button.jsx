import * as React from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils.js";

const CraftButtonContext = React.createContext({ size: "default" });

function CraftButtonLabel({ children, className }) {
  return (
    <span
      className={cn(
        "group-hover:text-foreground relative z-2 transition-colors duration-500",
        className,
      )}
    >
      {children}
    </span>
  );
}

function CraftButtonIcon({ children, className }) {
  const { size } = React.useContext(CraftButtonContext);
  const iconSize =
    size === "lg" ? "size-6" : size === "sm" ? "size-4" : "size-5";

  return (
    <span className={cn("relative z-1", iconSize, className)}>
      <span
        className={cn(
          "bg-background absolute inset-0 -z-1 rounded-full transition-transform duration-500 group-hover:scale-[15]",
          iconSize,
        )}
      />
      <span
        className={cn(
          "bg-background text-primary group-hover:bg-primary group-hover:text-background relative z-2 flex items-center justify-center rounded-full transition-all duration-500",
          iconSize,
        )}
      >
        {children}
      </span>
    </span>
  );
}

function CraftButton(props) {
  const { children, size, asChild = false, className, ...rest } = props;

  return (
    <CraftButtonContext.Provider value={{ size }}>
      <Button
        size={size}
        asChild={asChild}
        className={cn(
          "group hover:bg-background dark:hover:border-primary/30 relative cursor-pointer overflow-hidden rounded-full duration-500 hover:shadow-md dark:border dark:border-transparent",
          className,
        )}
        {...rest}
      >
        {children}
      </Button>
    </CraftButtonContext.Provider>
  );
}

export { CraftButton, CraftButtonLabel, CraftButtonIcon };
