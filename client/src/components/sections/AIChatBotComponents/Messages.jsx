import React, { useState } from "react";
import {
  ChatInput,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
  Conversation,
  Message,
} from "@/components/ui/conversation";

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
    {
      id: crypto.randomUUID(),
      role: "user",
      content: "Hello! How can I help you today?",
    },
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
    {
      id: crypto.randomUUID(),
      role: "user",
      content: "Hello! How can I help you today?",
    },
  ]);

  const sendMessage = (text) => {
    const userMsg = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const aiMsg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "This is a dummy AI response fknbfkdf 🤖",
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-125 w-90 rounded-xl overflow-hidden">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState />
          ) : (
            messages.map((msg) => (
              <Message key={msg.id} role={msg.role}>
                {msg.content}
              </Message>
            ))
          )}
        </ConversationContent>

        <ConversationScrollButton />
      </Conversation>

      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default AIChat;
