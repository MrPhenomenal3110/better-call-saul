import ChatSidebar from "@components/chat/ChatSidebar";
import ChatWindow from "@components/chat/ChatWindow";
import LoaderScreen from "@components/LoadingScreen";
import { useChat } from "@hooks/useChat";
import { useConversation } from "@hooks/useConversation";
import { useToast } from "@hooks/useToast";
import { useChatContext } from "@providers/ChatProvider";
import { useEffect } from "react";

const Dashboard = () => {
  const { loading, error, conversations, getAllConversationsForUser } =
    useConversation();
  const toast = useToast();
  const {
    loading: messagesLoading,
    messages,
    setMessages,
    sendHumanMessage,
    fetchMessages,
  } = useChat();
  const { selectedConversationId, setSelectedConversationId } =
    useChatContext();

  useEffect(() => {
    getAllConversationsForUser();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return loading ? (
    <LoaderScreen />
  ) : (
    <div className="flex h-screen bg-black text-white">
      <ChatSidebar
        setMessages={setMessages}
        conversations={conversations}
        setSelectedConversationId={setSelectedConversationId}
      />
      <ChatWindow
        loading={messagesLoading}
        messages={messages}
        fetchMessages={fetchMessages}
        sendHumanMessage={sendHumanMessage}
        selectedConversationId={selectedConversationId}
        getAllConversationsForUser={getAllConversationsForUser}
      />
    </div>
  );
};

export default Dashboard;
