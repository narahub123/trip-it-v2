import { checkPassordAPI } from "apis/profile";
import { RefObject, useCallback } from "react";
import { proflieMsgs } from "templates/data/message";
import { fetchMessage } from "templates/utilities/template";
import { MessageType } from "types/template";

// 입력한 비밀번호를 서버에서 확인하는 함수
export function useCheckPassword(
  password: string,
  setPassword: (value: string) => void,
  setOpenModal: (value: boolean) => void,
  setDisabled: (value: boolean) => void,
  setMessage: (value: MessageType | undefined) => void,
  ref: RefObject<HTMLInputElement>
) {
  console.log("비밀번호 확인 렌더링");

  return useCallback(
    (e: any) => {
      console.log(password);
      checkPassordAPI(password)
        .then((res) => {
          console.log(res); // 서버로부터 받은 응답 데이터 로그
          if (res?.status === 200) {
            setPassword(""); // 비밀번호 입력 필드 초기화
            setOpenModal(false); // 모달 닫기
            setDisabled(false); // 비밀번호 입력 필드 활성화
            setMessage(fetchMessage(2, proflieMsgs));
            if (ref.current) {
              console.log(ref.current);
              ref.current.value = "";
              ref.current.focus();
            }
          }
        })
        .catch((err) => {
          // 에러 메시지를 message 상태에 저장
          if (!err.msgId) return;
          const msg = fetchMessage(err.msgId, proflieMsgs);
          setMessage(msg);
        }); // 오류 발생 시 로그

      e.preventDefault();
    },
    [
      password,
      setPassword,
      setOpenModal,
      setDisabled,
      setMessage,
      ref,
      fetchMessage,
      proflieMsgs,
    ]
  );
}
