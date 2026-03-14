import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useWorkflowStore from "@/store/workflow.store.js";

const PromptInput = () => {
  const [input, setInput] = useState("");
  const sendMessage = useWorkflowStore((state) => state.sendMessage);

  const handleSend = () => {
    const message = input.trim();
    if (!message) return;

    sendMessage({
      role: "user",
      content: message,
    });
    setInput("");
  };

  const handleKeyDown = (e) => {
    // Enter to send
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 rounded-b-lg border bg-muted/30 p-2">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask something..."
        rows={1}
        className="max-h-32 min-h-10 resize-none border-0 bg-transparent text-sm focus-visible:ring-0"
      />

      <Button
        size="icon"
        onClick={handleSend}
        disabled={!input.trim()}
        className="shrink-0"
      >
        <Send className="size-4" />
      </Button>
    </div>
  );
};

export default PromptInput;
