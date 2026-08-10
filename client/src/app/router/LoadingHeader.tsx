import React from "react";

const LoadingHeader = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full items-center justify-between px-4 md:px-6">
        {/* Logo skeleton */}
        <div className="h-7 w-32 animate-pulse rounded-md bg-muted" />

        {/* Navigation skeleton */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="h-4 w-12 animate-pulse rounded bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="h-4 w-12 animate-pulse rounded bg-muted" />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-32 animate-pulse rounded-full bg-muted" />
          <div className="size-9 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </header>
  );
};

export default LoadingHeader;
