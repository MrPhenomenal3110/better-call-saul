import type { Conversation, Message } from "@models/entities";
import { useSearchParams } from "react-router-dom";

type ChatSidebarProps = {
  conversations: Conversation[] | null;
  setMessages: (messages: Message[]) => void;
  setSelectedConversationId: (id: number | null) => void;
};

const ChatSidebar = ({
  conversations,
  setMessages,
  setSelectedConversationId,
}: ChatSidebarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCreateConversation = () => {
    setSearchParams("");
    setMessages([]);
    setSelectedConversationId(null);
  };

  const handleSelect = (id: number) => {
    searchParams.set("conversationId", id.toString());
    setSearchParams(searchParams);
  };
  return (
    <div className="w-[260px] bg-[#1e1e1e] p-4 flex flex-col border-r border-gray-700">
      <button
        onClick={handleCreateConversation}
        className="mb-4 py-2 px-3 bg-gray-700 hover:bg-gray-600 text-sm rounded"
      >
        + New Chat
      </button>
      <div className="flex-1 overflow-y-auto space-y-2">
        {conversations?.map((conversation) => (
          <div
            onClick={() => handleSelect(conversation.id)}
            key={conversation.id}
            className="p-2 rounded hover:bg-gray-600 cursor-pointer text-sm"
          >
            {conversation.title || "New chat"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
