type Props = {
  title: string;
};

const ChatHeader = ({ title }: Props) => {
  return (
    <div className="sticky top-0 z-10 bg-black border-b border-gray-700 px-6 py-4">
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
  );
};

export default ChatHeader;
