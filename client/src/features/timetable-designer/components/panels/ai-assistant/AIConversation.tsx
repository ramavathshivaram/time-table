import { memo, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AIMessage from "./AIMessage";
import AITypingIndicator from "./AITypingIndicator";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const AIConversation = () => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages: Message[] = [
    {
      id: "1",
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
    {
      id: "2",
      role: "user",
      content: "Generate timetable for CSE 3rd Year Section A.",
    },
    {
      id: "3",
      role: "assistant",
      content: "Generating timetable for CSE 3rd Year Section A...",
    },
    {
      id: "4",
      role: "user",
      content: "Generate timetable for CSE 3rd Year Section B.",
    },
    {
      id: "5",
      role: "assistant",
      content: "Generating timetable for CSE 3rd Year Section B...",
    },
    {
      id: "1",
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
    {
      id: "2",
      role: "user",
      content: "Generate timetable for CSE 3rd Year Section A.",
    },
    {
      id: "3",
      role: "assistant",
      content: "Generating timetable for CSE 3rd Year Section A...",
    },
    {
      id: "4",
      role: "user",
      content: "Generate timetable for CSE 3rd Year Section B.",
    },
    {
      id: "5",
      role: "assistant",
      content: "Generating timetable for CSE 3rd Year Section B...",
    },
  ];

  const isLoading = false;

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
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
            >
              <AIMessage role={message.role} content={message.content} />
            </motion.div>
          ))}

          {isLoading && <AITypingIndicator />}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Top fade */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 top-0
          h-8
          bg-gradient-to-b
          from-background
          to-transparent
        "
      />

      {/* Bottom fade */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 bottom-0
          h-8
          bg-gradient-to-t
          from-background
          to-transparent
        "
      />
    </div>
  );
};

const EmptyConversation = () => {
  return (
    <div className="flex h-full min-h-[240px] flex-col items-center justify-center text-center">
      <div
        className="
          flex size-11
          items-center justify-center
          rounded-xl
          border bg-muted/40
        "
      >
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
