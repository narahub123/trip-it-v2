import { MessageType } from "types/template";
import "./messageModal.css";

export interface MessageModalProps {
  message: MessageType;
  setMessage: (value: MessageType | undefined) => void;
}

const MessageModal = ({ message, setMessage }: MessageModalProps) => {
  return (
    <div className="message-modal">
      <div className="message-modal-container">
        <div className="message-modal-main">
          <p className="message-modal-header">{message.msgs.header}</p>
          <p className="message-modal-message">{message.msgs.main}</p>
          <div className="message-modal-btns">
            <button
              type="button"
              className="message-modal-cancel"
              onClick={() => {
                setMessage(undefined);
              }}
              disabled={
                message.type === "error" || message.type === "alert"
                  ? true
                  : false
              }
              autoFocus
            >
              {message.type === "error" || message.type === "alert"
                ? ""
                : "취소"}
            </button>
            <button
              type="button"
              className="message-modal-confirm"
              onClick={() => {
                setMessage(undefined);
              }}
              autoFocus
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
