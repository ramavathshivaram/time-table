import React, { memo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import useResourcesModalStore from "@/store/recources.modal.store.js";
import FacultyModal from "./FacultyModal";
import SubjectModal from "./SubjectModal";
import RoomModal from "./RoomModal";

const ResourcesModal = () => {
  const type = useResourcesModalStore((s) => s.type);
  const isModalOpen = useResourcesModalStore((s) => s.isModalOpen);
  const closeModal = useResourcesModalStore((s) => s.closeModal);

  if (!isModalOpen) return null;

  const ModalComponents = {
    faculty: FacultyModal,
    subject: SubjectModal,
    room: RoomModal,
  };

  if (!ModalComponents[type]) return null;

  const ModalComponent = ModalComponents[type];

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
        <Card className="shadow-xl border border-gray-700 rounded-xl p-6 w-105 bg-background">
          <ModalComponent closeModal={closeModal} />
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default memo(ResourcesModal);
