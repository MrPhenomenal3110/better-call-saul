import React from "react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex space-x-1 items-center justify-start bg-white p-4 rounded-lg shadow-sm rounded-tl-none">
      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" />
    </div>
  );
};

export default TypingIndicator;
