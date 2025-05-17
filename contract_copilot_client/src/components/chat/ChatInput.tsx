import type { AppDispatch } from "stores";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { sendHumanMessage } from "stores/chat";
import {
  createNewConversationThunk,
  fetchConversations,
} from "@stores/conversations";
import { selectCurrentConversationId } from "@selectors/conversations";
import { selectChatLoading } from "@selectors/chat";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const currentConversationId = useSelector(selectCurrentConversationId);
  const messagesLoading = useSelector(selectChatLoading);

  const handleSendMessage = async () => {
    if (!currentConversationId) {
      const newConversationId = await dispatch(createNewConversationThunk());
      if (newConversationId) {
        setInput("");
        await dispatch(
          sendHumanMessage({
            conversationId: newConversationId,
            message: input,
          })
        );
        searchParams.set("conversationId", newConversationId.toString());
        setSearchParams(searchParams);
      }
      dispatch(fetchConversations());
      return;
    } else {
      dispatch(
        sendHumanMessage({
          conversationId: currentConversationId,
          message: input,
        })
      );
      setInput("");
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
        disabled={messagesLoading || !input}
        className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
