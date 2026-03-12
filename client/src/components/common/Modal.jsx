import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const Modal = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{
          scale: 0.3,
          opacity: 0,
        }}
        animate={{
          scale: [0.3, 1.05, 1],
          opacity: 1,
        }}
        exit={{
          scale: 0.3,
          opacity: 0,
        }}
        transition={{
          duration: 0.45,
          ease: "easeInOut",
        }}
      >
        <Card className="shadow-xl border border-gray-700 rounded-xl p-6 w-105 bg-background"></Card>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
