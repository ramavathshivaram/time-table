import React, { memo } from "react";
import useWorkflowStore from "@/store/workflow.store.js";
import { ConversationEmptyState, Message } from "@/components/ui/conversation";

const Messages = () => {
  const messages = useWorkflowStore((state) => state.messages);

  return (
    <>
      {messages.length === 0 ? (
        <ConversationEmptyState />
      ) : (
        messages.map((msg, idx) => (
          <Message key={idx} role={msg.role}>
            {msg.content}
          </Message>
        ))
      )}
    </>
  );
};

export default memo(Messages);
