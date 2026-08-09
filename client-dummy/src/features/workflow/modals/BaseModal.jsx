import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const BaseModal = ({ children, origin, onClose }) => {
  const startX = origin?.x ? origin.x - window.innerWidth / 2 : 0;
  const startY = origin?.y ? origin.y - window.innerHeight / 2 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 backdrop-blur bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
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
        transition={{ duration: 0.45 }}
      >
        <Card className="shadow-xl border border-gray-700 rounded-xl p-6 w-105 bg-background">
          {children}
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default BaseModal;