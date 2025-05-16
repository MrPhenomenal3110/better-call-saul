// components/Chat/MessageBubble.tsx
const MessageBubble = ({
  message,
}: {
  message: { sender: string; text: string };
}) => {
  const isUser = message.sender === "USER";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] p-3 rounded-xl text-sm ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
