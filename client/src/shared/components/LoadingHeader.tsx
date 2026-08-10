import React from "react";

const LoadingHeader = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-[9999] h-1 overflow-hidden bg-muted">
      <div className="h-full w-1/3 animate-pulse bg-primary" />
    </div>
  );
};

export default LoadingHeader;
