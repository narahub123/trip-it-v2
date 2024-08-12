import { useState } from "react";
import "./mobilePlanHomeModal.css";
import { MessageType } from "types/template";
import { metros } from "data/metros";
import { useNavigate } from "react-router-dom";
import { getMetroName } from "utilities/metros";

export interface ModalProps {
  message: MessageType;
  setMessage: (value: MessageType | undefined) => void;
}

const MobilePlanHomeModal = ({ message, setMessage }: ModalProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // 모달창 열고 닫기
  const handleOpenModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    const classname = e.currentTarget.className;

    if (classname === "mobile-plan-home-modal fade") {
      // message가 undefined이면 모달창이 닫힘
      setMessage(undefined);
    }
  };

  const defaultImage = metros.find(
    (metro) => metro.areaCode === message.params
  )?.imgUrl;

  // esc 키를 누르면 모달창이 닫힘
  window.onkeydown = (e) => {
    if (e.key === "Escape") setMessage(undefined);
  };

  loading && (
    <div
      className="mobile-plan-home-modal fade"
      onClick={(e) => handleOpenModal(e)}
    >
      <div
        className="mobile-plan-home-modal-container"
        onClick={(e) => handleOpenModal(e)}
      >
        loading...
      </div>
    </div>
  );

  const handleMove = () => {
    setMessage(undefined);
    document.body.style.overflow = "auto";
    navigate(`/planner/${getMetroName(message.params)}`);
  };
  return (
    <div
      className={`mobile-plan-home-modal${message ? " fade" : ""}`}
      onClick={(e) => handleOpenModal(e)}
    >
      <div
        className={`mobile-plan-home-modal-container`}
        onClick={(e) => handleOpenModal(e)}
      >
        <div className="mobile-plan-home-modal-header">
          {message.msgs.header}
        </div>
        <div className="mobile-plan-home-modal-body">
          <figure className="mobile-plan-home-modal-body-img-container">
            <img
              src={defaultImage}
              alt="지역 이미지"
              className="mobile-plan-home-modal-body-img-"
            ></img>
          </figure>
          <p className="mobile-plan-home-modal-body-expl">
            {message.msgs.main}
          </p>
        </div>
        <div className="mobile-plan-home-modal-footer">
          <button className="cancel" onClick={() => setMessage(undefined)}>
            취소
          </button>
          <button className="next" onClick={() => handleMove()}>
            일정
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePlanHomeModal;
