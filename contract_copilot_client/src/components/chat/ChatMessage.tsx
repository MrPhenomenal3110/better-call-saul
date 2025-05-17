type Props = {
  sender: "USER" | "AI";
  text: string;
};

const ChatMessage = ({ sender, text }: Props) => {
  const isUser = sender === "USER";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
          isUser ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatMessage;
