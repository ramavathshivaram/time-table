import { Loader2, SendHorizontal, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const AIPrompt = () => {
  const [message, setMessage] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isLoading = false;

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    textarea.style.height = `${Math.min(textarea.scrollHeight, 140)}px`;
  }, [message]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const content = message.trim();

    if (!content || isLoading) return;

    console.log("AI Prompt:", content);

    setMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      handleSubmit(event as unknown);
    }
  };

  return (
    <div className="border-t border-border bg-background p-3">
      <motion.form
        onSubmit={handleSubmit}
        initial={{
          opacity: 0,
          y: 6,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <div
          className={cn(
            `
              flex items-end
              overflow-hidden
              rounded-xl
              border border-border
              bg-card
              transition-colors
            `,
            "focus-within:border-primary/30",
          )}
        >
          <div className="flex h-10 items-center pl-3">
            <Sparkles className="size-3.5 text-muted-foreground" />
          </div>

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={1}
            placeholder="Ask about your timetable..."
            className="
              max-h-[140px]
              min-h-[42px]
              flex-1
              resize-none
              bg-transparent
              px-2.5 py-2.5
              text-xs
              outline-none
              placeholder:text-muted-foreground
            "
          />

          <div className="p-1.5">
            <Button
              type="submit"
              size="icon"
              disabled={!message.trim() || isLoading}
              className="
                size-8 rounded-lg
              "
            >
              {isLoading ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <SendHorizontal className="size-3.5" />
              )}
            </Button>
          </div>
        </div>

        <p className="mt-1.5 text-center text-[9px] text-muted-foreground">
          Enter to send · Shift + Enter for new line
        </p>
      </motion.form>
    </div>
  );
};

export default AIPrompt;
