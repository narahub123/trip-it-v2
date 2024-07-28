import { TemplateArrayType } from "types/template";

// 목록 사이즈 크기 목록
export const sizeArray = [1, 2, 3, 4, 5];

// 마이 페이지 차단 목록
export const blockArray: TemplateArrayType[] = [
  {
    field: { name: "index" },
    type: "index",
    title: "번호",
    sort: { key: "", value: "" },
    search: { able: false },
  },
  {
    field: { name: "nickname" },
    type: "normal", // 값 그대로 적용
    title: "차단 당한 유저",
    sort: { key: "nickname", value: "asc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "blockDate" },
    type: "date", // 값 그대로 적용
    title: "차단 날짜",
    sort: { key: "blockDate", value: "desc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "unBlock" },
    type: "unBlock",
    title: "차단 해제",
    sort: { key: "", value: "" },
    search: { able: false },
  },
];

// 관리자 페이지 차단 목록
export const blocksArray: TemplateArrayType[] = [
  {
    field: { name: "index" },
    type: "index",
    title: "번호",
    sort: { key: "", value: "" },
    search: { able: false },
  },
  {
    field: { name: "userId", nested: ["userId", "nickname"] },
    type: "nested", // 값 그대로 적용
    title: "차단한 유저",
    sort: { key: "userId.nickname", value: "asc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "nickname" },
    type: "normal", // 값 그대로 적용
    title: "차단 당한 유저",
    sort: { key: "nickname", value: "asc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "blockDate" },
    type: "date", // 값 그대로 적용
    title: "차단 날짜",
    sort: { key: "blockDate", value: "desc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "unBlock" },
    type: "unBlock",
    title: "차단 해제",
    sort: { key: "", value: "" },
    search: { able: false },
  },
];

// 마이 페이지 신고 목록
export const reportArray: TemplateArrayType[] = [
  {
    field: { name: "index" },
    type: "index",
    title: "번호",
    sort: { key: "", value: "" },
    search: { able: false },
  },
  {
    field: { name: "postId" },
    type: "normal",
    title: "모집글",
    sort: { key: "postId", value: "asc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "reportType" },
    type: "normal",
    title: "신고유형",
    sort: { key: "reportType", value: "asc" },
    search: {
      able: true,
      type: "select",
      enum: { R1: "음란", R2: "폭력", R3: "욕설", R4: "기타" },
    },
  },
  {
    field: { name: "reportDetail" },
    type: "normal",
    title: "신고 상세",
    sort: { key: "reportDetail", value: "asc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "reportDate" },
    type: "date",
    title: "신고 날짜",
    sort: { key: "reportDate", value: "desc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "reportFalse" },
    type: "normal",
    title: "신고처리여부",
    sort: { key: "reportFalse", value: "asc" },
    search: {
      able: true,
      type: "select",
      enum: { 0: "처리 중", 1: "허위 신고", 2: "처리 완료", 3: "중복 신고" },
    },
  },
];

// 관리자 페이지 신고 페이지
export const reportsArray: TemplateArrayType[] = [
  {
    field: { name: "index" },
    type: "index",
    title: "번호",
    sort: { key: "", value: "" },
    search: { able: false },
  },
  {
    field: { name: "userId", nested: ["userId", "nickname"] },
    type: "nested",
    title: "신고 유저",
    sort: { key: "userId.nickname", value: "asc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "postId" },
    type: "normal",
    title: "모집글",
    sort: { key: "postId", value: "asc" },
    search: { able: false, type: "normal" },
  },
  {
    field: { name: "reportType" },
    type: "normal",
    title: "신고유형",
    sort: { key: "reportType", value: "asc" },
    search: {
      able: true,
      type: "select",
      enum: { R1: "음란", R2: "폭력", R3: "욕설", R4: "기타" },
    },
  },
  {
    field: { name: "reportDetail" },
    type: "normal",
    title: "신고 상세",
    sort: { key: "reportDetail", value: "asc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "reportDate" },
    type: "date",
    title: "신고 날짜",
    sort: { key: "reportDate", value: "desc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "reportFalse" },
    type: "report",
    title: "신고처리여부",
    sort: { key: "reportFalse", value: "asc" },
    search: {
      able: true,
      type: "select",
      enum: { 0: "처리 중", 1: "허위 신고", 2: "처리 완료", 3: "중복 신고" },
    },
  },
];
