import { Button } from "@components/Button";
import {
  selectConversations,
  selectCurrentConversationId,
} from "@selectors/conversations";
import { resetMessages } from "@stores/chat";
import { setcurrentConversationId } from "@stores/conversations";
import type { AppDispatch } from "@stores/index";
import { showPreview } from "@utils/showPreview";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import Law from "assets/law.svg";

const ChatSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [searchParams, setSearchParams] = useSearchParams();
  const conversations = useSelector(selectConversations);
  const currentConversationId = useSelector(selectCurrentConversationId);

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
    <div className="w-[300px] bg-gray-800 py-4 px-2 flex flex-col gap-2 border-r border-gray-700">
      <div className="w-full flex flex-col gap-6 items-center justify-center border-b border-b-gray-200/20">
        <div className="w-full flex flex-row items-center justify-start gap-4 p-2">
          <div className="rounded-lg bg-blue-500">
            <img className="w-10 h-10 p-2" src={Law} alt="law-icon" />
          </div>
          <div className="font-sans font-extrabold text-2xl">
            Better Call Saul
          </div>
        </div>
        <Button
          onClick={handleCreateConversation}
          className="w-full mb-4 py-2 px-3 bg-gray-700 hover:bg-gray-600 text-sm rounded-full"
        >
          + New Chat
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2">
        {conversations?.map((conversation) => (
          <div
            onClick={() => handleSelect(conversation.id)}
            key={conversation.id}
            className={classNames(
              "p-4 rounded-lg hover:bg-gray-600 cursor-pointer text-sm",
              {
                "bg-gray-700": currentConversationId === conversation.id,
              }
            )}
          >
            {showPreview(conversation.messages?.[0].content, 25) || "New chat"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
