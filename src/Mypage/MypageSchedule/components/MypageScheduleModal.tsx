import { useEffect, useRef } from "react";
import "./mypageScheduleModal.css";
import useModalOutsideClick from "hooks/useModalOutsideClick";
import { deleteSchedulesMAPI } from "apis/schedule";

interface mypageScheduleModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  selections: (string | number)[];
  setSelections: (value: (string | number)[]) => void;
  items: any[];
  setItems: (value: any[]) => void;
  message:
    | { type: string; msgs: { title: string; detail: string } }
    | undefined;
  setMessage: (value: {
    type: string;
    msgs: { title: string; detail: string };
  }) => void;
}

const MypageScheduleModal = ({
  open,
  setOpen,
  selections,
  setSelections,
  items,
  setItems,
  message,
  setMessage,
}: mypageScheduleModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useModalOutsideClick(modalRef, () => setOpen(false), open);

  const handleConfirm = () => {
    deleteSchedulesMAPI(selections)
      .then((res) => {
        if (res.status === 200) {
          const cloneItems = [...items];

          const newItems = cloneItems.filter(
            (item) => !selections.includes(item.scheduleId)
          );

          setItems(newItems);
          setSelections([]);

          setMessage({
            type: "alert",
            msgs: { title: "삭제가 완료되었습니다.", detail: "" },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage({
          type: "alert",
          msgs: {
            title: "삭제가 실패했습니다.",
            detail: "잠시 후 다시 시도해주세요.",
          },
        });
      });
  };

  const handleAlert = () => {
    setOpen(!open);
  };

  return (
    <div className={`mypage-schedule-modal${open ? " open" : ""}`}>
      <div className="mypage-schedule-modal-container" ref={modalRef}>
        <div className="mypage-schedule-modal-wrapper">
          <p className="mypage-schedule-modal-title">{message?.msgs.title}</p>
          <p className="mypage-schedule-modal-detail">{message?.msgs.detail}</p>
          <div
            className={`mypage-schedule-modal-btns${
              message?.type === "confirm" ? " confirm" : ""
            }`}
          >
            {message?.type === "confirm" && (
              <button
                className="mypage-schedule-modal-btns-cancel"
                onClick={() => setOpen(!open)}
              >
                취소
              </button>
            )}
            {message?.type === "confirm" ? (
              <button
                className="mypage-schedule-modal-btns-confirm"
                onClick={() => handleConfirm()}
              >
                확인
              </button>
            ) : (
              <button
                className="mypage-schedule-modal-btns-alert"
                onClick={() => handleAlert()}
              >
                확인
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageScheduleModal;
