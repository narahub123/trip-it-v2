import { TemplateArrayType } from "types/template";

// 목록 사이즈 크기 목록
export const sizeArray = [1, 2, 3, 4, 5];

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

export const reportArray: TemplateArrayType[] = [
  {
    field: "index",
    type: "index",
    title: "번호",
    sort: { key: "", value: "" },
    search: false,
  },
  {
    field: "postId",
    type: "normal",
    title: "모집글",
    sort: { key: "postId", value: "asc" },
    search: true,
  },
  {
    field: "reportType",
    type: "normal",
    title: "신고유형",
    sort: { key: "reportType", value: "asc" },
    search: true,
  },
  {
    field: "reportDetail",
    type: "normal",
    title: "신고 상세",
    sort: { key: "reportDetail", value: "asc" },
    search: true,
  },
  {
    field: "reportDate",
    type: "date",
    title: "신고 날짜",
    sort: { key: "reportDate", value: "desc" },
    search: true,
  },
  {
    field: "reportFalse",
    type: "normal",
    title: "신고처리여부",
    sort: { key: "reportFalse", value: "asc" },
    search: true,
  },
];
