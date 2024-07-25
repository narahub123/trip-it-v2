import { debounce } from "utilities/debounce";

// 정렬 함수
export const handleSort = (
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

// 페이지 사이즈 조절 함수
const handleSizeChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setSize: (value: number) => void
) => {
  const value = Number(e.target.value);

  setSize(value);
};

export const debouncedHandleSizeChange = (setSize: (value: number) => void) => {
  return debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    handleSizeChange(e, setSize);
  }, 200);
};

// 검색 입력 변경 핸들러 함수
const handleSearchChange = (
  e: React.ChangeEvent<HTMLInputElement>, // 이벤트 객체
  setSearch: (value: string) => void // 검색 상태를 설정하는 함수
) => {
  const value = e.target.value; // 입력 필드의 현재 값

  setSearch(value); // 검색 상태를 현재 값으로 설정
};

// 디바운스된 검색 입력 변경 핸들러 함수
export const debouncedHandleSearchChange = (
  setSearch: (value: string) => void // 검색 상태를 설정하는 함수
) => {
  // 디바운스를 적용한 함수 반환
  return debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchChange(e, setSearch); // 검색 입력 변경 함수 호출
  }, 500); // 500밀리초 지연
};
