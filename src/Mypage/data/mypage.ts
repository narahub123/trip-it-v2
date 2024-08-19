import { SortandSearchType } from "Mypage/types/mypage";

// 목록 사이즈 크기 목록
export const sizeArray = [12, 16, 20, 24, 28];

// 마이 페이지 일정 페이지
export const mypageScheduleSnSArray: SortandSearchType[] = [
  {
    field: { name: "index" },
    type: "index",
    title: "번호",
    sort: { key: "", value: "" },
    search: { able: false },
  },
  {
    field: { name: "scheduleId" },
    type: "checkbox",
    title: "삭제",
    sort: { key: "", value: "" },
    search: { able: false },
  },
  {
    field: { name: "metroId" },
    type: "normal",
    title: "지역",
    sort: { key: "metroId", value: "asc" },
    search: {
      able: true,
      type: "normal",
    },
  },
  {
    field: { name: "scheduleTitle" },
    type: "normal",
    title: "일정 제목",
    sort: { key: "scheduleTitle", value: "asc" },
    search: {
      able: true,
      type: "normal",
    },
  },
  {
    field: { name: "registerDate" },
    type: "date", // 값 그대로 적용
    title: "등록 날짜",
    sort: { key: "registerDate", value: "desc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "startDate" },
    type: "date", // 값 그대로 적용
    title: "시작 날짜",
    sort: { key: "startDate", value: "asc" },
    search: { able: false, type: "normal" },
  },
  {
    field: { name: "endDate" },
    type: "date", // 값 그대로 적용
    title: "종료 날짜",
    sort: { key: "endDate", value: "asc" },
    search: { able: false, type: "normal" },
  },
];

// 마이 페이지 차단 목록
export const mypageBlockSnSArray: SortandSearchType[] = [
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
  {
    field: { name: "blockId" },
    type: "checkbox",
    title: "선택",
    sort: { key: "", value: "" },
    search: { able: false },
  },
];

// 마이 페이지 신고 목록
export const mypageReportSnSArray: SortandSearchType[] = [
  {
    field: { name: "index" },
    type: "index",
    title: "번호",
    sort: { key: "", value: "" },
    search: { able: false },
  },

  {
    field: { name: "postTitle" },
    type: "normal",
    title: "모집글",
    sort: { key: "postId.postTitle", value: "asc" },
    search: { able: true, type: "normal" },
  },
  {
    field: { name: "reportReason" },
    type: "normal",
    title: "신고유형",
    sort: { key: "reportType.reportReason", value: "asc" },
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
    type: "reportResult",
    title: "신고처리여부",
    sort: { key: "reportFalse", value: "asc" },
    search: {
      able: true,
      type: "select",
      enum: { 0: "처리 중", 1: "허위 신고", 2: "처리 완료", 3: "중복 신고" },
    },
  },
];
