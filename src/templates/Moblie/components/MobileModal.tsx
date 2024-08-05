import { useNavigate } from "react-router-dom";
import "./mobileModal.css";
import { MessageType } from "types/template";

export interface MobileModalProps {
  message: MessageType;
  setMessage: (value: MessageType | undefined) => void;
  password?: string;
}

const MobileModal = ({ message, setMessage, password }: MobileModalProps) => {
  const navigate = useNavigate();
  // confirm 형일 경우
  const handleConfirm = () => {
    if (!message.func) {
      return;
    }

    if (message.msgId === 2) {
      message.params = password;
    }

    message.func(message.params);
  };

  const handleAlert = () => {
    if (!message.func) {
      return;
    }

    message.func(message.params);

    setMessage(undefined);
  };

  const moveToNext = () => {
    const areaCode = message.params;

    navigate(`/planner/${areaCode}#calendar`);
  };

  // modal 밖을 클릭하면 모달창이 닫힘
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    const classname = e.currentTarget.className;
    if (classname === "mobile-template-modal") {
      setMessage(undefined);
    }
  };

  // esc 키를 누르면 모달창이 닫힘
  window.onkeydown = (e) => {
    if (e.key === "Escape") {
      setMessage(undefined);
    }
  };

  return (
    <div className="mobile-template-modal" onClick={(e) => handleClose(e)}>
      <div
        className="mobile-template-modal-container"
        onClick={(e) => handleClose(e)}
      >
        <div className="mobile-template-modal-inner">
          <div className="mobile-template-modal-message">
            <p
              className={`mobile-template-modal-message-header ${
                message.msgs.main ? "active" : undefined
              }`}
            >
              {message.msgs.header}
            </p>
            <p
              className={`mobile-template-modal-message-main ${
                message.msgs.main ? "active" : undefined
              }`}
            >
              {message.msgs.main}
            </p>
          </div>
          <div className="mobile-template-modal-btns">
            <>
              <button
                className={`mobile-template-modal-btns cancel ${
                  message.type === "confirm" || message.type === "move"
                    ? "active"
                    : undefined
                }`}
                onClick={() => setMessage(undefined)}
                autoFocus={message.msgId !== 2 ? true : false}
              >
                취소
              </button>
              <button
                className="mobile-template-modal-btns confirm"
                onClick={
                  message.type === "confirm"
                    ? handleConfirm
                    : message.type === "move"
                    ? moveToNext
                    : message.type === "alert"
                    ? handleAlert
                    : undefined
                }
                autoFocus={message.type === "alert" ? true : false}
              >
                확인
              </button>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileModal;
