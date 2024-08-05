import { updatePasswordAPI, updateProfileAPI } from "apis/profile";
import { Ref, RefObject, useCallback } from "react";
import { proflieMsgs } from "templates/data/message";
import { fetchMessage } from "templates/utilities/template";
import { MessageType } from "types/template";
import { ProfileType, UserType } from "types/users";

// 모달창을 열기 위한 핸들러
export const handleModal = (setOpenModal: (value: boolean) => void) => {
  // 비밀번호 수정 확인 메시지
  if (!window.confirm(`비밀번호를 수정하시겠습니까?`)) {
    return;
  }
  setOpenModal(true); // 모달창 열기
};

// 비밀번호 입력 필드의 값이 변경될 때 호출되는 핸들러
export const handleChangePassword = (
  e: React.ChangeEvent<HTMLInputElement>,
  setPassword: (value: string) => void
) => {
  console.log(e.target, "gs");
  console.log(e.currentTarget, "mo");

  const value = e.target ? e.target.value : e.currentTarget.value;

  console.log(value);

  setPassword(value); // 비밀번호 상태 업데이트
};

// 비밀번호를 변경하는 함수
export const changePassword = (
  password: string,
  setMessage: (value: MessageType | undefined) => void,
  setDisabled: (value: boolean) => void,
  setPassword: (value: string) => void,
  ref: RefObject<HTMLInputElement>
) => {
  const validation = ValidatePw(password); // 비밀번호 유효성 검사
  if (!validation) {
    setMessage(fetchMessage(7, proflieMsgs));
    return;
  }

  if (!window.confirm(`입력한 비밀번호로 변경하시겠습니까?`)) {
    return;
  }

  // 비밀번호 업데이트 API 호출
  updatePasswordAPI(password)
    .then((res) => {
      if (!res) {
        return;
      }

      console.log(res);

      if (res.status === 200) {
        setDisabled(true); // 비밀번호 입력 필드 비활성화
        setPassword(`***********************************`); // 비밀번호 입력 필드 초기화
        setMessage(fetchMessage(4, proflieMsgs)); // 업데이트 성공 알림
        if (ref.current) {
          ref.current.value = "***********************************";
        }
      }
    })
    .catch((err) => {
      setMessage(fetchMessage(err.msgId, proflieMsgs));
    });
};

// 비밀번호 유효성 검사 함수
export const ValidatePw = (value: string) => {
  // 비밀번호 정규 표현식 (영문자, 숫자, 특수문자 포함, 길이 8-12자)
  const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
  const result = pwRegex.test(value);
  console.log(result); // 유효성 검사 결과 로그
  return result; // 유효성 검사 결과 반환
};

// 프로필 입력 필드의 값이 변경될 때 호출되는 핸들러
export const handleProfileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  profile: ProfileType,
  setProfile: (value: ProfileType) => void
) => {
  const id = e.target.id;
  const value = e.target.value.trim();

  console.log(id, value);

  setProfile({
    ...profile,
    [id]: value,
  });
};

// 프로필 수정하기
export const handleProfile = (
  profile: ProfileType,
  setMessage: (value: MessageType | undefined) => void,
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>,
  setImagePercent: (value: number) => void
) => {
  if (!window.confirm("프로필을 수정하시겠습니까?")) {
    return false;
  }

  updateProfileAPI(profile)
    .then((res) => {
      if (!res) return;

      if (res.status === 200) {
        setMessage(fetchMessage(8, proflieMsgs));
        setUser((prevUser) => ({
          userpic: profile.userpic,
          nickname: profile.nickname,
          intro: profile.intro,
          birth: prevUser?.birth ?? "",
          email: prevUser?.email ?? "",
          gender: prevUser?.gender ?? "m",
          password: prevUser?.password ?? "",
          regdate: prevUser?.regdate ?? "",
          _id: prevUser?._id ?? "",
          reportCount: prevUser?.reportCount ?? 0,
          role: prevUser?.role ?? "user",
          userId: prevUser?.userId ?? "",
          username: prevUser?.username ?? "",
        }));
        setImagePercent(0);
      }
    })
    .catch((err) => {
      setMessage(fetchMessage(err.msgId, proflieMsgs));
    });
};
