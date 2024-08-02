import { unBlockAPI } from "apis/block";
import { blockMsgs } from "templates/data/message";
import { fetchMessage } from "templates/utilities/template";
import { MessageType } from "types/template";

// 정렬 함수
export const handleSort = (
  e: React.MouseEvent<HTMLTableHeaderCellElement | HTMLLIElement, MouseEvent>, // 이벤트 객체
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

// 필드 변경 핸들러 함수
export const handleFieldChange = (
  e: React.ChangeEvent<HTMLSelectElement>, // 이벤트 객체
  setField: (value: { name: string; nested?: string[] }) => void // 필드 상태를 설정하는 함수
) => {
  const field = e.currentTarget.value; // 선택된 필드 값

  setField({ name: field }); // 필드 상태를 선택된 값으로 설정
};

// 차단 해제 버튼 클릭 핸들러 함수
export const handleUnblock = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>, // 버튼 클릭 이벤트 객체
  items: any[],
  setItems: (value: any[]) => void,
  setMessage: (value: MessageType | undefined) => void,
  blockId: string | number
) => {
  // 클릭된 버튼의 데이터 속성에서 사용자 닉네임 추출
  const nickname = e.currentTarget.dataset.nickname;

  // 사용자에게 차단 해제 확인 대화상자 표시
  if (!window.confirm(`${nickname}님에 대한 차단을 해제하시겠습니까?`)) {
    return; // 사용자가 취소를 선택하면 함수 종료
  }

  // setMessage(fetchMessage(1, blockMsgs));

  // 차단 해제 API 호출
  unBlockAPI(blockId)
    .then((res) => {
      // 응답이 없는 경우 함수 종료
      if (!res) return;

      console.log(res.status);

      // 응답 코드가 "ok"인 경우
      if (res.data.code === "ok" || res.status === 200) {
        // 현재 아이템 목록에서 차단 ID가 일치하지 않는 아이템만 필터링
        const newItems = items.filter((item) => item.blockId !== blockId);

        // 필터링된 새 아이템 목록으로 상태 업데이트
        setItems(newItems);

        // 차단 해제 성공 메시지 표시
        // alert(`${nickname}에 대한 차단이 해제 되었습니다.`);
        setMessage(fetchMessage(2, blockMsgs));
      }
    })
    .catch((error) => {
      // 오류 발생 시, 오류를 콘솔에 출력 (옵션)
      console.log(error);
      // 사용자에게 오류 메시지 표시 (옵션, 필요 시 추가)
      // alert("차단 해제 중 오류가 발생했습니다.");
      setMessage(fetchMessage(3, blockMsgs));
    });
};
