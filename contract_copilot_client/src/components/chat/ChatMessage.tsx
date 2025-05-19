import classNames from "classnames";
import ReactMarkdown from "react-markdown";

import Bolt from "assets/bolt.svg";
import Success from "assets/success.svg";

type Props = {
  sender: "USER" | "AI" | "TOOL" | "USER_FILE_UPLOAD";
  text: string;
  toolUsed: string | undefined | null;
};

const ChatMessage = ({ sender, text, toolUsed }: Props) => {
  const isUser = sender === "USER";
  const isTool = sender === "TOOL";
  const isPDF = sender === "USER_FILE_UPLOAD";

  if (isPDF) {
    return (
      <div className="flex justify-end">
        <div className="flex flex-row justify-center items-center gap-2 rounded-full bg-gray-100 hover:bg-gray-100 px-3! py-2! border border-blue-800 border-dashed text-sm text-blue-800! shadow-md">
          <img className="w-8 h-8 p-0" src={Success} alt="upload-success" />
          Uploaded a <strong>PDF</strong>document
        </div>
      </div>
    );
  }

  if (isTool && toolUsed) {
    return (
      <div className="flex justify-start my-2 rounded-full">
        <div className="flex flex-row justify-center items-center gap-1 rounded-full bg-gray-100 hover:bg-gray-100 py-1! px-2! border border-blue-800 border-dashed text-xs text-blue-800!">
          <img className="w-4 h-4 p-0" src={Bolt} alt="bolt" />
          Tool call <strong>{toolUsed}</strong>executed
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames("flex", {
        "justify-end": isUser,
        "justify-start": !isUser,
      })}
    >
      <div
        className={classNames(
          "max-w-[70%] shadow-lg py-4 px-6 rounded-xl text-sm",
          {
            "bg-blue-500 text-white rounded-tr-none": isUser,
            "bg-white text-gray-800 rounded-tl-none": !isUser,
          }
        )}
      >
        <div
          className="
              font-sans
              leading-[140%] 
              [&>h2]:py-4! [&>h2]:text-3xl 
              [&>h3]:py-4! [&>h3]:text-2xl 
              [&>h4]:py-4! [&>h4]:text-xl
              [&>ol>li]:py-3! [&>ol>li]:text-md
            "
        >
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
