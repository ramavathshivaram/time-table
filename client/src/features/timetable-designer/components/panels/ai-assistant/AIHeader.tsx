import { Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const AIHeader = () => {
  return (
    <header
      className="
        relative overflow-hidden
        border-b border-border
        px-4 py-3
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-r
          from-primary/5
          via-transparent
          to-primary/5
        "
      />

      <div className="relative flex items-center gap-3">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            flex size-9 shrink-0
            items-center justify-center
            rounded-xl
            border
            bg-muted/50
          "
        >
          <Bot className="size-4" />
        </motion.div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-semibold">Timetable AI</h2>

            <Sparkles className="size-3.5 text-primary" />
          </div>

          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />

            <p className="text-[10px] text-muted-foreground">Ready to help</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AIHeader;
