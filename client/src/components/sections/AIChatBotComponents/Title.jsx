import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import React from "react";

const Title = ({ setIsChatbotOpen }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center gap-2 font-medium">
        <Bot size={18} />
        AI Assistant
      </div>

      <Button
        onClick={() => setIsChatbotOpen(false)}
        className="text-muted-foreground"
      >
        <X size={16} />
      </Button>
    </div>
  );
};

export default Title;
