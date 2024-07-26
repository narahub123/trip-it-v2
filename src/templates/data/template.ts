export const blockArray = [
  {
    field: "index",
    type: "index",
    title: "번호",
    sort: { key: "", value: "" },
  },
  {
    field: "nickname",
    type: "normal", // 값 그대로 적용
    title: "차단 당한 유저",
    sort: { key: "nickname", value: "asc" },
  },
  {
    field: "blockDate",
    type: "date", // 값 그대로 적용
    title: "차단 날짜",
    sort: { key: "blockDate", value: "desc" },
  },
  {
    field: "unBlock",
    type: "unBlock",
    title: "차단 해제",
    sort: { key: "", value: "" },
  },
];
