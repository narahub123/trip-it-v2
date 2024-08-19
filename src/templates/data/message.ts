import { MessageType } from "types/template";

export const userMsgs: MessageType[] = [
  {
    msgId: 1,
    type: "error",
    msgs: {
      header: "데이터를 요청할 권한이 없습니다.",
      main: "관리자로 로그인 해 주세요.",
    },
  },
  {
    msgId: 2,
    type: "error",
    msgs: {
      header: "요청하신 데이터를 가져오지 못했습니다.",
      main: "잠시 후에 다시 시도해주세요.",
    },
  },
  {
    msgId: 6,
    type: "alert",
    msgs: {
      header: "업데이트가 완료되었습니다.",
      main: "",
    },
  },
];

export const blockMsgs: MessageType[] = [
  {
    msgId: 1,
    type: "confirm",
    msgs: {
      header: "차단을 해제하시겠습니까?",
      main: "",
    },
  },
  {
    msgId: 2,
    type: "alert",
    msgs: {
      header: "차단이 해제되었습니다.",
      main: "",
    },
  },
  {
    msgId: 3,
    type: "error",
    msgs: {
      header: "차단 해제가 실패했습니다.",
      main: "차단 해제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    },
  },
  {
    msgId: 4,
    type: "error",
    msgs: {
      header: "이미 차단한 유저입니다.",
      main: "마이페이지에서 해당 유저를 확인해보세요.",
    },
  },
  {
    msgId: 5,
    type: "error",
    msgs: {
      header: "해제를 요청할 권한이 없습니다.",
      main: "본인이 해제한 상대인지 확인해보세요.",
    },
  },
  {
    msgId: 6,
    type: "error",
    msgs: {
      header: "데이터를 요청할 권한이 없습니다.",
      main: "관리자로 로그인해주세요.",
    },
  },
];

export const reportMsgs: MessageType[] = [
  {
    msgId: 1,
    type: "confirm",
    msgs: {
      header: "신고를 처리하시겠습니까?",
      main: "",
    },
  },
  {
    msgId: 2,
    type: "alert",
    msgs: {
      header: "업데이트가 완료되었습니다.",
      main: "",
    },
  },
  {
    msgId: 3,
    type: "error",
    msgs: {
      header: "변경 권한이 없습니다.",
      main: "관리자만 변경이 가능합니다.",
    },
  },
  {
    msgId: 4,
    type: "error",
    msgs: {
      header: "업데이트 된 신고가 없습니다.",
      main: "이미 업데이트된 신고인지 확인 후 다시 시도해주세요.",
    },
  },
  {
    msgId: 5,
    type: "error",
    msgs: {
      header: "데이터 베이스에서 에러가 발생하였습니다.",
      main: "잠시후 다시 이용해주세요.",
    },
  },
  {
    msgId: 6,
    type: "error",
    msgs: {
      header: "이미 신고한 게시물입니다.",
      main: "마이 페이지에서 신고 결과를 확인해주세요.",
    },
  },
  {
    msgId: 7,
    type: "error",
    msgs: {
      header: "데이터를 요청할 권한이 없습니다.",
      main: "관리자로 로그인 해 주세요.",
    },
  },
];

export const postsMsgs: MessageType[] = [
  {
    msgId: 1,
    type: "error",
    msgs: {
      header: "데이터를 요청할 권한이 없습니다.",
      main: "관리자으로 로그인 해 주세요.",
    },
  },
  {
    msgId: 3,
    type: "error",
    msgs: {
      header: "데이터를 요청할 권한이 없습니다.",
      main: "관리자로 로그인 해 주세요.",
    },
  },
  {
    msgId: 4,
    type: "error",
    msgs: {
      header: "요청한 정보를 불러올 수 없습니다.",
      main: "잠시 후 다시 시도해주세요.",
    },
  },
  {
    msgId: 5,
    type: "error",
    msgs: {
      header: "데이터 베이스에 문제가 생겼습니다.",
      main: "잠시 후 다시 시도해주세요.",
    },
  },
];

export const schedulesMsgs: MessageType[] = [
  {
    msgId: 3,
    type: "error",
    msgs: {
      header: "데이터를 요청할 권한이 없습니다.",
      main: "관리자로 로그인 해 주세요.",
    },
  },
  {
    msgId: 4,
    type: "error",
    msgs: {
      header: "요청한 정보를 불러올 수 없습니다.",
      main: "잠시 후 다시 시도해주세요.",
    },
  },
  {
    msgId: 5,
    type: "error",
    msgs: {
      header: "데이터 베이스에 문제가 생겼습니다.",
      main: "잠시 후 다시 시도해주세요.",
    },
  },
  {
    msgId: 6,
    type: "confirm",
    msgs: {
      header: "해당 일정을 삭제하시겠습니까?",
      main: "해당 일정을 사용하는 모집글들과 같이 삭제가 됩니다.",
    },
  },
];

export const proflieMsgs: MessageType[] = [
  {
    msgId: 1,
    type: "error", // 에러
    msgs: {
      header: "잘못된 비밀번호입니다.",
      main: "비밀번호를 확인하시고 다시 입력해주세요",
    },
  },
  {
    msgId: 2,
    type: "alert", // 설명
    msgs: {
      header: "비밀번호 확인이 완료되었습니다.",
      main: "",
    },
  },
  {
    msgId: 3,
    type: "error",
    msgs: {
      header: "현재 사용하는 비밀번호와 동일합니다.",
      main: "현재 비밀번호와 다른 비밀번호를 등록해주세요",
    },
  },

  {
    msgId: 4,
    type: "alert",
    msgs: {
      header: "비밀번호가 업데이트 되었습니다.",
      main: "",
    },
  },

  {
    msgId: 5,
    type: "error",
    msgs: {
      header: "소개글이 너무 길어 업데이트 진행되지 못했습니다.",
      main: "소개글은 100자 이내로 작성해주세요",
    },
  },

  {
    msgId: 6,
    type: "error",
    msgs: {
      header: "동일한 닉네임이 발견되었습니다.",
      main: "다른 닉네임과 구별되는 특별한 닉네임을 입력해주세요",
    },
  },

  {
    msgId: 7,
    type: "error",
    msgs: {
      header: "잘못된 형식의 비밀번호입니다.",
      main: "한글, 영어, 숫자를 적어도 한 글자씩 넣어주세요",
    },
  },
  {
    msgId: 8,
    type: "alert",
    msgs: {
      header: "프로필 업데이트가 완료되었습니다.",
      main: "",
    },
  },
];
