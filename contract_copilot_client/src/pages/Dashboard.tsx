import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "@stores/index";

import {
  fetchConversations,
  setcurrentConversationId,
} from "@stores/conversations";

import ChatSidebar from "@components/chat/ChatSidebar";
import ChatWindow from "@components/chat/ChatWindow";
import { useSearchParams } from "react-router-dom";
import FileInputModal from "@components/chat/FileInputModal";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchConversations());
  }, []);

  useEffect(() => {
    dispatch(
      setcurrentConversationId(Number(searchParams.get("conversationId")))
    );
  }, [searchParams]);

  return (
    <div className="flex h-screen bg-black text-white">
      <ChatSidebar />
      <ChatWindow />
      <FileInputModal />
    </div>
  );
};

export default Dashboard;
