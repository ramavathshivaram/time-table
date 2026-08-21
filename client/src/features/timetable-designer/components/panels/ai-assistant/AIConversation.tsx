import { memo, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AIMessage from "./AIMessage";
import AITypingIndicator from "./AITypingIndicator";

import { useMessageStore } from "@/features/timetable-designer/store/message.store";
import type { Message } from "@/features/timetable-designer/types";

const AIConversation = () => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages = useMessageStore((state) => state.messages);
  const isLoading = useMessageStore((state) => state.isLoading);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  return (
    <div className="relative min-h-0 flex-1">
      <div className="h-full overflow-y-auto px-4 py-4 scrollbar">
        {!messages.length && !isLoading && <EmptyConversation />}

        <AnimatePresence initial={false}>
          {messages.map((message: Message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <AIMessage role={message.role} content={message.content} />
            </motion.div>
          ))}

          {isLoading && <AITypingIndicator />}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-background to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

const EmptyConversation = () => {
  return (
    <div className="flex h-full min-h-[240px] flex-col items-center justify-center text-center">
      <div className="flex size-11 items-center justify-center rounded-xl border bg-muted/40">
        ✨
      </div>

      <h3 className="mt-3 text-sm font-semibold">How can I help?</h3>

      <p className="mt-1 max-w-[260px] text-xs leading-5 text-muted-foreground">
        Ask me about conflicts, resources, scheduling, or optimizing your
        timetable.
      </p>
    </div>
  );
};

export default memo(AIConversation);
