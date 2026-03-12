import React, { useState } from "react";
import {
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
    <div className="flex flex-1 flex-col h-full w-full overflow-auto">
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
    </div>
  );
};

export default AIChat;
