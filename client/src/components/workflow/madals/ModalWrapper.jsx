import { motion } from "framer-motion";
import useModalStore from "@/store/modal.store.js";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ModalWrapper = () => {
  const { origin, activeNode, isModalOpen, closeModal } = useModalStore();

  if (!isModalOpen || !activeNode) return null;

  const startX = origin.x - window.innerWidth / 2;
  const startY = origin.y - window.innerHeight / 2;

  return (
    <motion.div
      initial={{
        x: startX,
        y: startY,
        scale: 0.2,
        opacity: 0,
      }}
      animate={
        isModalOpen
          ? {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
            }
          : {
              x: startX,
              y: startY,
              scale: 0.2,
              opacity: 0,
            }
      }
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 22,
      }}
      className="fixed inset-0 flex items-center justify-center backdrop-blur bg-white/70 z-50"
    >
      <Card className="shadow-md border border-gray-700 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">{activeNode.data.label}</h2>
        <p className="text-sm text-gray-600 mb-4">ID: {activeNode.id}</p>
        <p className="text-sm text-gray-800">{activeNode.data.description}</p>
        <Button onClick={closeModal}>Close</Button>
      </Card>
    </motion.div>
  );
};

export default ModalWrapper;
