import React from "react";
import {
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
  Conversation,
  Message,
} from "@/components/ui/conversation";
import useWorkflowStore from "@/store/workflow.store.js";

const AIChat = () => {
  const messages = useWorkflowStore((state) => state.messages);

  return (
    <div className="flex flex-1 bg-transparent flex-col h-full w-full overflow-y-auto scrollbar">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState />
          ) : (
            messages.map((msg, idx) => (
              <Message key={idx} role={msg.role}>
                {msg.content}
              </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  );
};

export default AIChat;
