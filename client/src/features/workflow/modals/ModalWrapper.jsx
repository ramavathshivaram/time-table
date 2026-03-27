import React, { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import useModalStore from "@/store/modal.store.js";
import { useReactFlow } from "@xyflow/react";

import CollegeModal from "./CollegeModal";
import BranchModal from "./BranchModal";
import YearModal from "./YearModal";
import SectionModal from "./SectionModal";

const ModalWrapper = () => {
  const { setNodes } = useReactFlow();
  const { origin, activeNode, isModalOpen, closeModal } = useModalStore();

  if (!isModalOpen || !activeNode) return null;

  const startX = origin.x - window.innerWidth / 2;
  const startY = origin.y - window.innerHeight / 2;

  const modal_map = {
    college: CollegeModal,
    branch: BranchModal,
    year: YearModal,
    section: SectionModal,
  };

  const ModalComponent = modal_map[activeNode.type];

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
          x: startX,
          y: startY,
          scale: 0.3,
          opacity: 0,
        }}
        animate={{
          x: 0,
          y: 0,
          scale: [0.3, 1.05, 1],
          opacity: 1,
        }}
        exit={{
          x: startX,
          y: startY,
          scale: 0.3,
          opacity: 0,
        }}
        transition={{
          duration: 0.45,
          ease: "easeInOut",
        }}
      >
        <Card className="shadow-xl border border-gray-700 rounded-xl p-6 w-105 bg-background">
          <ModalComponent
            activeNode={activeNode}
            setNodes={setNodes}
            closeModal={closeModal}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default memo(ModalWrapper);
