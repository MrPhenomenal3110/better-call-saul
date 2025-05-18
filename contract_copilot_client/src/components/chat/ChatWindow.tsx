import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChatError, selectMessages } from "@selectors/chat";
import type { Message } from "@models/entities";
import { fetchMessages } from "@stores/chat";
import type { AppDispatch } from "@stores/index";
import { selectCurrentConversationId } from "@selectors/conversations";
import { useToast } from "@hooks/useToast";

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
    <div className="flex-1 flex flex-col justify-between">
      <ChatHeader title={"New conversation"} />
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages?.map((msg: Message) => (
          <ChatMessage key={msg.id} sender={msg.sender} text={msg.content} />
        ))}
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatWindow;
