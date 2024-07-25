// // 정렬 함수
// export const handleSort = (
//   e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
//   items: any[],
//   setItems: (value: any[]) => void,
//   setSort: (value: string[]) => void
// ) => {
//   // 데이터 키와 값을 가져옴
//   const sortKey = e.currentTarget.dataset.key;
//   const sortValue = e.currentTarget.dataset.value;

//   // 키와 값이 없으면 함수 종료
//   if (!sortKey || !sortValue) return;

//   let sortedItems;
//   // 현재 아이템 목록 복사
//   const currentItems = [...items];

//   // 아이템 목록을 정렬
//   sortedItems = currentItems.sort((item1, item2) => {
//     // 아이템이 없으면 -1 반환
//     if (!item1 || !item2) return -1;

//     // 정렬할 값 쌍을 만듦
//     const pairs = [item1[sortKey], item2[sortKey]];

//     // 내림차순 정렬인 경우
//     if (sortValue === "desc") {
//       // 다음 정렬을 오름차순으로 설정
//       e.currentTarget.dataset.value = "asc";
//       // 값 쌍을 역순으로
//       pairs.reverse();
//     } else {
//       // 다음 정렬을 내림차순으로 설정
//       e.currentTarget.dataset.value = "desc";
//       // 값 쌍을 정렬
//       pairs.sort();
//     }

//     let result = 0;

//     // 값이 문자열인 경우 localeCompare를 사용해 비교
//     if (typeof pairs[0] === "string" && typeof pairs[1] === "string") {
//       result = (pairs[0] as string).localeCompare(pairs[1] as string);
//     }
//     // 값이 숫자인인 경우
//     else if (typeof pairs[0] === "number" && typeof pairs[1] === "number") {
//       result = (pairs[0] as number) - (pairs[1] as number);
//     }

//     return result;
//   });

//   // 정렬된 아이템 목록을 상태로 설정
//   setItems(sortedItems);

//   // 정렬 상태를 업데이트
//   setSort([sortKey, sortValue]);
// };

// 정렬 함수
export const handleSort = (
  e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>, // 이벤트 객체
  items: any[], // 정렬할 아이템 목록
  setItems: (value: any[]) => void, // 정렬된 아이템을 설정할 함수
  setSort: (value: string[]) => void // 현재 정렬 상태를 설정할 함수
) => {
  // 데이터 키와 값을 가져옴
  const sortKey = e.currentTarget.dataset.key;
  const sortValue = e.currentTarget.dataset.value;

  // 키와 값이 없으면 함수 종료
  if (!sortKey || !sortValue) return;

  // 현재 아이템 목록 복사
  const currentItems = [...items];

  // 아이템 목록을 정렬
  const sortedItems = currentItems.sort((item1, item2) => {
    // 아이템이 없으면 0 반환
    if (!item1 || !item2) return 0;

    // 첫 번째 값과 두 번째 값을 비교
    const value1 = item1[sortKey];
    const value2 = item2[sortKey];

    // 값이 문자열인 경우 localeCompare를 사용해 비교
    if (typeof value1 === "string" && typeof value2 === "string") {
      return sortValue === "desc"
        ? value2.localeCompare(value1)
        : value1.localeCompare(value2);
    }
    // 값이 숫자인 경우
    else if (typeof value1 === "number" && typeof value2 === "number") {
      return sortValue === "desc" ? value2 - value1 : value1 - value2;
    }

    // 비교할 수 없는 타입인 경우 0 반환
    return 0;
  });

  // 다음 정렬 방향을 설정
  e.currentTarget.dataset.value = sortValue === "desc" ? "asc" : "desc";

  // 정렬된 아이템 목록을 상태로 설정
  setItems(sortedItems);

  // 정렬 상태를 업데이트
  setSort([sortKey, sortValue]);
};
