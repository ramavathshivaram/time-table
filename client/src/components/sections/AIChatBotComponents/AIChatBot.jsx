import React from "react";
import { Card } from "@/components/ui/card";

import PromptInput from "./PromptInput";
import Title from "./Title";
import Messages from "./Messages";

const AIChatBot = ({ setIsChatbotOpen }) => {
  return (
    <Card className="min-h-[70vh] max-h-[70vh] w-100 shadow-xl rounded-xl flex flex-col overflow-hidden p-0.5">
      <Title setIsChatbotOpen={setIsChatbotOpen} />
      <Messages />
      <PromptInput />
    </Card>
  );
};

export default AIChatBot;
