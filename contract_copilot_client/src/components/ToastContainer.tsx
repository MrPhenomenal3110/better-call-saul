import { useToastContext } from "@providers/ToastProvider";

const bgColors = {
  success: "bg-green-600",
  error: "bg-red-400",
  info: "bg-blue-600",
};

const ToastContainer = () => {
  const { toasts } = useToastContext();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(({ id, message, type }) => (
        <div
          key={id}
          className={`text-white w-64! px-4! py-2! mb-4! rounded shadow-md ${bgColors[type]}`}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
