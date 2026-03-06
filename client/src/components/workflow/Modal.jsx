import { motion } from "framer-motion";
import useModalStore from "@/store/modal.store.js";
import React from "react";

const Modal = () => {
  const { origin, activeNode, isModalOpen, closeModal } = useModalStore();

  if (!activeNode) return null;

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
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 z-50"
    >
      <h2>{activeNode.data.label}</h2>

      <p>ID: {activeNode.id}</p>
      <p>Description: {activeNode.data.description}</p>

      <button onClick={closeModal}>Close</button>
    </motion.div>
  );
};

export default Modal;