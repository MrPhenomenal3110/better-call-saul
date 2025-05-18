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
import { Button } from "@components/Button";
import ArrowRight from "assets/arrow-right.svg";
import Pin from "assets/pin.svg";
import { toggleModal } from "@stores/modal";
import { MODAL_NAMES } from "@utils/constants";

const ChatInput = () => {
  const [input, setInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();
  const currentConversationId = useSelector(selectCurrentConversationId);
  const messagesLoading = useSelector(selectChatLoading);

  const handleSendMessage = async () => {
    if (!currentConversationId) {
      const newConversationId = await createNewConversationThunk();
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

  const handleFileUploadModalOpen = () => {
    dispatch(toggleModal(MODAL_NAMES.FILE_INPUT_MODAL, true));
  };

  return (
    <div className="p-4 bg-white flex items-center gap-2">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 pl-4 pr-32 py-4 rounded-lg bg-white text-gray-800 outline-none relative border border-gray-300 focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            await handleSendMessage();
          }
        }}
      />
      <div className="flex flex-row items-center justify-center gap-2 absolute right-8">
        <Button
          onClick={handleFileUploadModalOpen}
          variant="secondary"
          disabled={messagesLoading}
          className="rounded-full! p-4 text-sm cursor-pointer"
        >
          <img className="h-4 w-4" src={Pin} alt="pin" />
        </Button>
        <Button
          onClick={async () => {
            await handleSendMessage();
          }}
          disabled={messagesLoading || !input}
          className="bg-blue-600 hover:bg-blue-500 rounded-full! p-4 text-sm cursor-pointer"
        >
          <img className="h-4 w-4" src={ArrowRight} alt="right arrow" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
