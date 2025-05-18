// components/ui/Modal.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { toggleModal } from "@stores/modal";
import { MODAL_NAMES } from "@utils/constants";
import { X } from "lucide-react"; // Optional icon lib

interface ModalProps {
  modalId: (typeof MODAL_NAMES)[keyof typeof MODAL_NAMES];
  isModalOpen: boolean;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  onClose?: () => void | Promise<void>;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const Modal: React.FC<ModalProps> = ({
  modalId,
  isModalOpen,
  title,
  children,
  size = "md",
  onClose,
  showCloseButton = true,
}) => {
  const dispatch = useDispatch();

  const closeModal = async () => {
    dispatch(toggleModal(modalId, false));
    if (onClose) {
      await onClose();
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`bg-white w-full ${sizeClasses[size]} mx-4 rounded-2xl shadow-xl p-6 relative`}
      >
        {showCloseButton && (
          <button
            onClick={async () => {
              await closeModal();
            }}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        )}
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        )}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
