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


