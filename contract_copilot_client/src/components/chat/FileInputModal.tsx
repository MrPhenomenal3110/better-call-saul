import { Button } from "@components/Button";
import { isFileInputModalOpen } from "@selectors/modal";
import { MODAL_NAMES } from "@utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "@stores/modal";
import Upload from "assets/upload.svg";
import Modal from "ui/Modal";
import { useState } from "react";
import { selectCurrentConversationId } from "@selectors/conversations";
import { fetchMessages, uploadFile } from "@stores/chat";
import type { AppDispatch } from "@stores/index";
import { useToast } from "@hooks/useToast";
import { useSearchParams } from "react-router-dom";

const MAX_FILE_SIZE_MB = 25;

const FileInputModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isModalOpen = useSelector(isFileInputModalOpen);
  const currentConversationId = useSelector(selectCurrentConversationId);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState("");
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setFile(null);
      return;
    }

    const sizeInMB = selectedFile.size / (1024 * 1024);
    if (sizeInMB > MAX_FILE_SIZE_MB) {
      setError("File size exceeds 25MB limit.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("title", filename);
    if (currentConversationId) {
      formData.append("sessionId", currentConversationId?.toString());
    }

    await dispatch(uploadFile(formData, toast, searchParams, setSearchParams));
    await onClose();

    dispatch(toggleModal(MODAL_NAMES.FILE_INPUT_MODAL, false));
    setLoading(false);
  };

  const onClose = async () => {
    if (currentConversationId) {
      await dispatch(fetchMessages(currentConversationId));
    }
  };

  return (
    <Modal
      size="lg"
      modalId={MODAL_NAMES.FILE_INPUT_MODAL}
      isModalOpen={isModalOpen}
      showCloseButton={false}
      title="Upload Your Contract"
    >
      <div className="flex flex-col items-start gap-4">
        <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-4">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="file-upload" className="text-sm text-gray-800">
              Upload your contract in PDF format
              <span className="text-xs text-red-500 my-2 block">
                (Max size <strong>25MB</strong>, only <strong>*.pdf</strong>{" "}
                files supported)
              </span>
            </label>
            <div className="relative w-full">
              <img
                className="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2"
                src={Upload}
                alt="upload icon"
              />
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full pl-10 py-2 pr-3 text-sm border border-gray-300 rounded-md cursor-pointer text-gray-800 file:bg-transparent file:border-0"
              />
            </div>
            {error && <p className="text-xs text-red-600 my-2">{error}</p>}
          </div>

          <div className="w-full">
            <label htmlFor="file-upload" className="text-sm text-gray-800 mb-2">
              Enter the file name
              <span className="text-xs text-red-500 block my-2">
                (No special characters allowed in file name. Only use{" "}
                <strong>a-z, A-Z, 0-9</strong> for file name)
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter the name of your file"
              value={filename}
              maxLength={20}
              onChange={(e) => {
                const input = e.target.value;
                const sanitized = input.replace(/[^a-zA-Z0-9]/g, "");
                setFilename(sanitized);
              }}
              className="w-full px-3 py-2 text-sm border text-gray-800 border-gray-300 rounded-md"
            />
          </div>

          <div className="w-full flex flex-row justify-end gap-2">
            <Button disabled={loading} variant="secondary">
              Cancel
            </Button>
            <Button
              loading={loading}
              disabled={!file || !filename}
              onClick={async () => {
                await handleUpload();
              }}
              type="button"
            >
              Upload
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default FileInputModal;
