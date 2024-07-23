export const proflieMsgs = [
  {
    msgId: 1,
    type: 1, // 에러
    msgs: {
      header: "잘못된 비밀번호입니다.",
      main: "비밀번호를 확인하시고 다시 입력해주세요",
    },
  },
  {
    msgId: 2,
    type: 2, // 설명
    msgs: {
      header: "비밀번호 확인이 완료되었습니다.",
      main: "",
    },
  },
  {
    msgId: 3,
    type: 1,
    msgs: {
      header: "현재 사용하는 비밀번호와 동일합니다.",
      main: "현재 비밀번호와 다른 비밀번호를 등록해주세요",
    },
  },

  {
    msgId: 4,
    type: 2,
    msgs: {
      header: "비밀번호가 업데이트 되었습니다.",
      main: "",
    },
  },

  {
    msgId: 5,
    type: 1,
    msgs: {
      header: "소개글이 너무 길어 업데이트 진행되지 못했습니다.",
      main: "소개글은 100자 이내로 작성해주세요",
    },
  },

  {
    msgId: 6,
    type: 1,
    msgs: {
      header: "동일한 닉네임이 발견되었습니다.",
      main: "다른 닉네임과 구별되는 특별한 닉네임을 입력해주세요",
    },
  },

  {
    msgId: 7,
    type: 1,
    msgs: {
      header: "잘못된 형식의 비밀번호입니다.",
      main: "한글, 영어, 숫자를 적어도 한 글자씩 넣어주세요",
    },
  },
  {
    msgId: 8,
    type: 2,
    msgs: {
      header: "프로필 업데이트가 완료되었습니다.",
      main: "",
    },
  },
];

export interface ProfileMsgType {
  msgId: number;
  type: number;
  msgs: {
    header: string;
    main: string;
  };
}

export const fetchProfileMsg = (msgId: number) => {
  return proflieMsgs.find((msg) => msg.msgId === msgId);
};
