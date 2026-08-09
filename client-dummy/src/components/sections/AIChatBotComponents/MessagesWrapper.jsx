import React, { memo } from "react";
import {
  ConversationContent,
  ConversationScrollButton,
  Conversation,
} from "@/components/ui/conversation";
import Messages from "./Messages";
import InterSections from "./InterSections";

const AIChat = () => {
  return (
    <div className="flex flex-1 bg-transparent flex-col h-full w-full overflow-y-auto scrollbar">
      <Conversation>
        <ConversationContent>
          <InterSections />
          <Messages />
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  );
};

export default memo(AIChat);
