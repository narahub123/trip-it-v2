import { handleReport } from "pages/Admin/Reports/utilities/reports"; // 신고 처리 함수 import
import { handleUnblock } from "pages/mypage/utils/block"; // 차단 해제 함수 import
import { NavLink } from "react-router-dom"; // 페이지 이동을 위한 NavLink import
import { convertYYYYMMDDToDate1 } from "utilities/date"; // 날짜 형식 변환 함수 import

// 관리자 페이지 정렬 함수
export const handleSortAdmin = (
  e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
  setSort: (value: string[]) => void
) => {
  // 클릭한 테이블 헤더 셀의 데이터 키와 값을 가져옵니다.
  const sortKey = e.currentTarget.dataset.key;
  const sortValue = e.currentTarget.dataset.value;

  // 데이터 키나 값이 없으면 함수를 종료합니다.
  if (!sortKey || !sortValue) return;

  // 현재 정렬 값이 "desc"인 경우 "asc"로 변경하고, 그렇지 않으면 "desc"로 변경합니다.
  if (sortValue === "desc") {
    e.currentTarget.dataset.value = "asc";
  } else {
    e.currentTarget.dataset.value = "desc";
  }

  // 상태를 정렬 키와 값으로 설정합니다.
  setSort([sortKey, sortValue]);
};

// getResult 함수는 다양한 타입에 따라 다른 결과를 반환합니다.
export const getResult = (
  body: any, // 동작 타입과 필드 정보를 포함하는 객체
  item: any, // 현재 항목의 데이터
  index: number, // 현재 항목의 인덱스
  items: any[], // 모든 항목들의 배열
  setItems: (value: any[]) => void // items 배열을 업데이트하는 함수
) => {
  switch (
    body.type // body.type에 따라 동작을 분기합니다.
  ) {
    case "index":
      return index + 1; // 인덱스 반환 (1부터 시작)

    case "normal":
      return (
        <p className="text">
          {item[body.field.name] || "내용 없음"}
          {/* item에서 body.field에 해당하는 값이 있으면 표시, 없으면 "내용 없음" 표시 */}
        </p>
      );

    case "nested":
      return (
        <NavLink
          to={
            body.field.name === "userId"
              ? `/admin/users/${
                  item[body.field.name]?.[`${body.field.nested?.[0]}`]
                }` // userId에 따라 링크 생성
              : body.field.name === "postId"
              ? `/post/${item[body.field]?.[`${body?.field.nested?.[0]}`]}` // postId에 따라 링크 생성
              : ""
          }
        >
          <p className="text">
            {item[body.field.name]?.[`${body?.field.nested?.[1]}`] ??
              "내용 없음"}
            {/* nested 값에 따라 표시할 텍스트 결정 */}
          </p>
        </NavLink>
      );

    case "date":
      return convertYYYYMMDDToDate1(item[body.field.name || ""]); // 날짜 형식 변환 후 반환

    case "unBlock":
      return (
        <button
          className="mypage-template-main-table-body-td block-btn"
          id={item.blockId} // 차단 해제 버튼에 blockId 설정
          data-nickname={item.nickname} // data-nickname 속성에 nickname 설정
          onClick={(e) => handleUnblock(e, items, setItems)} // 클릭 시 handleUnblock 함수 호출
        >
          차단 해제
        </button>
      );

    case "report":
      return item[body.field.name] === "처리 전" ? ( // 신고 상태가 "처리 전"일 때
        <div className="report-false">
          {item[body.field.name] || "내용 없음"}
          <ul className="report-false-container">
            <li
              className="report-false-item"
              onClick={() => handleReport(item.reportId, 2, items, setItems)} // 신고 허용 처리
            >
              신고 허용
            </li>
            <li
              className="report-false-item"
              onClick={() => handleReport(item.reportId, 1, items, setItems)} // 허위 신고 처리
            >
              허위 신고
            </li>
          </ul>
        </div>
      ) : (
        <div className="report-false-done">
          {item[body.field.name] || "내용 없음"}
          {/* 처리 완료 상태 표시 */}
        </div>
      );
  }
};

// field 변경
export const handleField = (
  field: any,
  setField: (value: { name: string; nested?: string[] }) => void,
  setSearch: (value: string) => void
) => {
  setField(field);
  setSearch("");
};

// 검색 방법 변경
export const handleSearch = (
  search: string,
  select: string,
  setSearch: (value: string) => void
) => {
  setSearch(select);
};
