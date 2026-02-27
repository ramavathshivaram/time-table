import React from "react";
import { motion } from "framer-motion";

const LoadingHeader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 overflow-hidden">
      <motion.div
        initial={{ x: 0, }}
        animate={{
          x: "100vh",
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.5, 1],
        }}
        className="h-full w-50 bg-blue-600 rounded-full"
      />
    </div>
  );
};

export default LoadingHeader;
