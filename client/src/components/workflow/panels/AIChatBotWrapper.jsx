import React, { memo, useState } from "react";
import { Bot } from "lucide-react";
import AIChatBot from "@/components/sections/AIChatBotComponents/AIChatBot";

const AIChatBotWrapper = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div>
      {/* Chat Window */}
      {isChatbotOpen ? (
        <AIChatBot setIsChatbotOpen={setIsChatbotOpen} />
      ) : (
        <div
          onClick={() => setIsChatbotOpen((prev) => !prev)}
          className="cursor-pointer w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg p-0"
        >
          <Bot size={30} className="text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

export default memo(AIChatBotWrapper);
