import type { Message } from "@models/entities";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useEffect } from "react";

type ChatWindowProps = {
  loading: boolean;
  messages: Message[] | null;
  selectedConversationId: number | null;
  fetchMessages: (conversationId: number) => Promise<void>;
  sendHumanMessage: ({
    message,
    conversationId,
  }: {
    message: string;
    conversationId: number;
  }) => Promise<void>;
  getAllConversationsForUser: () => Promise<void>;
};

const ChatWindow = ({
  loading,
  messages,
  selectedConversationId,
  fetchMessages,
  sendHumanMessage,
  getAllConversationsForUser,
}: ChatWindowProps) => {
  useEffect(() => {
    if (selectedConversationId) {
      fetchMessages(selectedConversationId);
    }
  }, [selectedConversationId]);

  return (
    <div className="flex-1 flex flex-col justify-between">
      <ChatHeader title={"New conversation"} />
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages?.map((msg) => (
          <ChatMessage key={msg.id} sender={msg.sender} text={msg.content} />
        ))}
      </div>
      <ChatInput
        selectedConversationId={selectedConversationId}
        loading={loading}
        sendHumanMessage={sendHumanMessage}
        getAllConversationsForUser={getAllConversationsForUser}
      />
    </div>
  );
};

export default ChatWindow;
