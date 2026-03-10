import React, { useState, useCallback } from "react";
import { ArrowDownIcon, Send } from "lucide-react";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ---------------- Conversation Container ---------------- */

export const Conversation = ({ className, ...props }) => (
  <StickToBottom
    className={cn("relative flex flex-col flex-1 overflow-hidden", className)}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props}
  />
);

export const ConversationContent = ({ className, ...props }) => (
  <StickToBottom.Content
    className={cn("flex flex-col gap-2 p-0", className)}
    {...props}
  />
);

/* ---------------- Empty State ---------------- */

export const ConversationEmptyState = ({
  title = "No messages yet",
  description = "Start a conversation with the AI",
}) => (
  <div className="flex flex-1 flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
    <p className="font-medium">{title}</p>
    <p>{description}</p>
  </div>
);

/* ---------------- Scroll Button ---------------- */

export const ConversationScrollButton = ({ className }) => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  const handleScroll = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  if (isAtBottom) return null;

  return (
    <Button
      className={cn(
        "absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full",
        className,
      )}
      onClick={handleScroll}
      size="icon"
      variant="outline"
    >
      <ArrowDownIcon className="size-4" />
    </Button>
  );
};

/* ---------------- Message Component ---------------- */

export const Message = ({ role, children }) => {
  return (
    <div
      className={cn(
        "max-w-[75%] rounded-lg p-2 text-sm",
        role === "user"
          ? "bg-primary text-primary-foreground ml-auto"
          : "bg-muted text-foreground",
      )}
    >
      {children}
    </div>
  );
};

export const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <div className="flex items-center gap-2 border-t p-2">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        className="flex-1 text-sm outline-none"
      />

      <Button size="icon" onClick={handleSend}>
        <Send className="size-4" />
      </Button>
    </div>
  );
};