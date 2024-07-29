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

export const postsMsgs = [
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

export const schedulesMsgs = [
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
