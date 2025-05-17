import { selectConversations } from "@selectors/conversations";
import { resetMessages } from "@stores/chat";
import { setcurrentConversationId } from "@stores/conversations";
import type { AppDispatch } from "@stores/index";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const ChatSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams, setSearchParams] = useSearchParams();
  const conversations = useSelector(selectConversations);

  const handleCreateConversation = () => {
    setSearchParams("");
    dispatch(resetMessages());
    dispatch(setcurrentConversationId(null));
  };

  const handleSelect = (id: number) => {
    searchParams.set("conversationId", id.toString());
    setSearchParams(searchParams);
    dispatch(setcurrentConversationId(id));
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
