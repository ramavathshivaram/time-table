const FullScreenLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
        <p>Connecting to server...</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;
