import React, { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type ChatContextType = {
  selectedConversationId: number | null;
  setSelectedConversationId: (id: number | null) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("conversationId");
    if (id) setSelectedConversationId(Number(id));
  }, [searchParams]);

  return (
    <ChatContext.Provider
      value={{ selectedConversationId, setSelectedConversationId }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context)
    throw new Error("useChatContext must be used within a ChatProvider");
  return context;
};
