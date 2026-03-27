import React from "react";
import { Card } from "@/components/ui/card";

import PromptInput from "./PromptInput";
import Title from "./Title";
import MessagesWrapper from "./MessagesWrapper";

const AIChatBot = ({ setIsChatbotOpen }) => {
  //todo load the messages from db with socket

  return (
    <Card className="min-h-[90vh] max-h-[90vh] w-100 backdrop-blur-lg shadow-xl rounded-xl flex flex-col overflow-hidden p-0.5">
      <Title setIsChatbotOpen={setIsChatbotOpen} />
      <MessagesWrapper />
      <PromptInput />
    </Card>
  );
};

export default AIChatBot;
