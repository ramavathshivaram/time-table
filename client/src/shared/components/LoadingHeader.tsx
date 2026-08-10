const LoadingHeader = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-9999 h-1 overflow-hidden rounded-none bg-muted">
      <div className="h-full w-1/3 animate-[loading_1.2s_ease-in-out_infinite] bg-primary rounded-full" />
    </div>
  );
};

export default LoadingHeader;
