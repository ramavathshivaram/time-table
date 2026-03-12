import { Button } from "@/components/ui/button";
import { Bot, X } from "lucide-react";
import React from "react";

const Title = ({ setIsChatbotOpen }) => {
  return (
    <div className="flex items-center justify-between px-2 py-3 border-b">
      <div className="flex items-center gap-2 font-medium">
        <Bot size={25} />
        AI Assistant
      </div>

      <div
        onClick={() => setIsChatbotOpen(false)}
        className="text-muted-foreground cusor-pointer"
      >
        <X size={25} className="hover:text-primary" />
      </div>
    </div>
  );
};

export default Title;
