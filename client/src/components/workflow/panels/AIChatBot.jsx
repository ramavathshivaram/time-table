import React, { memo, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import PromptInput from "@/components/sections/AIChatBotComponents/PromptInput";
import Title from "@/components/sections/AIChatBotComponents/Title";
import Messages from "@/components/sections/AIChatBotComponents/Messages";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AIChatBot = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isChatbotOpen && (
        <Card className="relative  shadow-xl rounded-xl border flex flex-col overflow-hidden p-1">
          <Title setIsChatbotOpen={setIsChatbotOpen} />
          <Messages />
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsChatbotOpen((prev) => !prev)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg p-0"
      >
        <Bot size={30} />
      </Button>
    </div>
  );
};

export default memo(AIChatBot);
