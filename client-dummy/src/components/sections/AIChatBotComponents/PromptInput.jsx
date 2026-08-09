import React, { memo, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import messageService from "@/services/workflow/message.service.js";

const PromptInput = () => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const message = input.trim();
    if (!message) return;

    messageService.sendMessage({
      role: "user",
      content: message,
    });
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 rounded-b-lg border p-2">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask something..."
        rows={1}
        className="max-h-32 min-h-10 resize-none border-0 bg-transparent text-sm focus-visible:ring-0 overflow-y-auto scrollbar"
      />

      <Button
        size="icon"
        onClick={handleSend}
        disabled={!input.trim()}
        className="shrink-0 cursor-pointer "
      >
        <Send className="size-4" />
      </Button>
    </div>
  );
};

export default memo(PromptInput);
