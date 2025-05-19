import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "@stores/index";
import type { Message } from "@models/entities";

import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import Plus from "assets/plus.svg";

import { useToast } from "@hooks/useToast";
import { selectChatError, selectMessages } from "@selectors/chat";
import { selectCurrentConversationId } from "@selectors/conversations";
import { fetchMessages } from "@stores/chat";

const ChatWindow = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const currentConversationId = useSelector(selectCurrentConversationId);
  const messages = useSelector(selectMessages);
  const messagesError = useSelector(selectChatError);

  useEffect(() => {
    if (currentConversationId) {
      dispatch(fetchMessages(currentConversationId));
    }
  }, [currentConversationId]);

  useEffect(() => {
    if (messagesError) {
      toast.error(messagesError);
    }
  }, [messagesError]);

  return (
    <div className="flex-1 flex flex-col justify-between bg-gray-200">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages?.map((msg: Message) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            text={msg.content}
            toolUsed={msg.toolUsed}
          />
        ))}
        {messages.length === 0 && (
          <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
            <img className="w-16 h-16 opacity-50" src={Plus} alt="" />
            <div className="text-gray-600 font-extrabold text-center">
              Start a new conversation by sending a message or uploading a legal
              document that you need help with
            </div>
          </div>
        )}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatWindow;
