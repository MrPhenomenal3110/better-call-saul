import { useConversation } from "@hooks/useConversation";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type ChatInputProps = {
  loading: boolean;
  selectedConversationId: number | null;
  sendHumanMessage: ({
    message,
    conversationId,
  }: {
    message: string;
    conversationId: number;
  }) => Promise<void>;
  getAllConversationsForUser: () => Promise<void>;
};

const ChatInput = ({
  loading,
  selectedConversationId,
  sendHumanMessage,
  getAllConversationsForUser,
}: ChatInputProps) => {
  const [input, setInput] = useState("");
  const { getNewConversationId } = useConversation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSendMessage = async () => {
    setInput("");
    if (!selectedConversationId) {
      const newConversationId = await getNewConversationId();
      if (newConversationId) {
        await sendHumanMessage({
          message: input,
          conversationId: newConversationId,
        });
        searchParams.set("conversationId", newConversationId.toString());
        setSearchParams(searchParams);
      }
      await getAllConversationsForUser();
      return;
    } else {
      await sendHumanMessage({
        message: input,
        conversationId: selectedConversationId,
      });
    }
  };
  return (
    <div className="p-4 border-t border-gray-700 bg-black flex items-center gap-2">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-lg bg-[#1e1e1e] text-white outline-none border border-gray-600 focus:border-white"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        onClick={async () => {
          await handleSendMessage();
        }}
        disabled={loading || !input}
        className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
