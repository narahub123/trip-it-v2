import { TemplateArrayType } from "types/template";

export const blockArray: TemplateArrayType[] = [
  {
    field: "index",
    type: "index",
    title: "번호",
    sort: { key: "", value: "" },
    search: false,
  },
  {
    field: "nickname",
    type: "normal", // 값 그대로 적용
    title: "차단 당한 유저",
    sort: { key: "nickname", value: "asc" },
    search: true,
  },
  {
    field: "blockDate",
    type: "date", // 값 그대로 적용
    title: "차단 날짜",
    sort: { key: "blockDate", value: "desc" },
    search: true,
  },
  {
    field: "unBlock",
    type: "unBlock",
    title: "차단 해제",
    sort: { key: "", value: "" },
    search: false,
  },
];
