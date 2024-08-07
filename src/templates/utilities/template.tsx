import { AxiosResponse } from "axios";
import { handleReport } from "pages/Admin/Reports/utilities/reports"; // 신고 처리 함수 import
import { handleUnblock } from "pages/mypage/utilities/block"; // 차단 해제 함수 import
import { NavLink } from "react-router-dom"; // 페이지 이동을 위한 NavLink import
import { MessageType } from "types/template";
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
  setItems: (value: any[]) => void, // items 배열을 업데이트하는 함수
  setMessage: (value: MessageType | undefined) => void,
  setDeletes: React.Dispatch<React.SetStateAction<(string | number)[]>>
) => {
  switch (
    body.type // body.type에 따라 동작을 분기합니다.
  ) {
    case "index":
      return index + 1; // 인덱스 반환 (1부터 시작)

    case "checkbox":
      return (
        <input
          type="checkbox"
          onChange={(e) =>
            handleDeleteChange(e, setDeletes, item[body.field.name])
          }
        />
      );

    case "normal":
      return (
        <p className="text">
          {item[body.field.name] || "내용 없음"}
          {/* item에서 body.field.name에 해당하는 값이 있으면 표시, 없으면 "내용 없음" 표시 */}
        </p>
      );

    case "image":
      return item[body.field.name].length === 0 ? (
        ""
      ) : (
        <img src={item[body.field.name]} alt="" className="userpic" />
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
              ? `/detail?post=${
                  item[body.field]?.[`${body?.field.nested?.[0]}`]
                }&user=${item[`userId`]?.[`${body?.field.nested?.[0]}`]}` // postId에 따라 링크 생성
              : body.field.name === "scheduleId"
              ? `/schedules/${item[body.field]?.[`${body?.field.nested?.[0]}`]}` // postId에 따라 링크 생성
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
          data-nickname={item.nickname} // data-nickname 속성에 nickname 설정
          onClick={(e) =>
            handleUnblock(e, items, setItems, setMessage, item.blockId)
          } // 클릭 시 handleUnblock 함수 호출
        >
          차단 해제
        </button>
      );

    case "report":
      console.log(item[body.field.name]);

      return item[body.field.name] === 0 ? ( // 신고 상태가 "처리 전"일 때
        <div className="report-false">
          {"처리전" || "내용 없음"}
          <ul className="report-false-container">
            <li
              className="report-false-item"
              onClick={() =>
                handleReport(item.reportId, 2, items, setItems, setMessage)
              } // 신고 허용 처리
            >
              신고 허용
            </li>
            <li
              className="report-false-item"
              onClick={() =>
                handleReport(item.reportId, 1, items, setItems, setMessage)
              } // 허위 신고 처리
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

// 메시지 변환
export const fetchMessage = (msgId: number, msgs: MessageType[]) => {
  return msgs.find((msg) => msg.msgId === msgId);
};

// 삭제를 위한 change
export const handleDeleteChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setDeletes: React.Dispatch<React.SetStateAction<(string | number)[]>>,
  id: string | number
) => {
  const checked = e.currentTarget.checked;
  console.log(id);
  console.log(checked);

  // 상태 업데이트: 체크된 경우 id를 배열에 추가
  if (checked) {
    setDeletes((prevDels) => {
      // id가 이미 배열에 존재하지 않는 경우에만 추가
      if (!prevDels.includes(id)) {
        return [...prevDels, id];
      }
      return prevDels;
    });
  } else {
    // 체크 해제된 경우 id를 배열에서 제거
    setDeletes((prevDels) => prevDels.filter((item) => item !== id));
  }
};

// 삭제 핸들러 함수
export const handleDelete = (
  deletes: (string | number)[],
  setDeletes: React.Dispatch<React.SetStateAction<(string | number)[]>>,
  items: any[],
  setItems: (value: any[]) => void,
  deleteAPI?: (
    ids: (string | number)[]
  ) => Promise<AxiosResponse<any, any> | undefined>
) => {
  if (deletes.length === 0) {
    window.alert(`삭제할 항목을 선택해주세요.`);
  }

  if (deletes.length > 0) {
    if (!window.confirm("선택한 항목을 삭제하시겠습니까?")) {
      return;
    }

    if (!deleteAPI) return;

    deleteAPI(deletes)
      .then((res) => {
        console.log(res?.data);

        if (res?.data.code === "ok") {
          window.alert("삭제를 완료했습니다.");
        }

        // 삭제할 항목의 ID를 Set으로 변환하여 빠른 조회를 가능하게 합니다.
        const deleteSet = new Set(deletes);

        // items 배열에서 deleteSet에 포함되지 않은 항목만 필터링합니다.
        const newItems = items.filter((item) => !deleteSet.has(item._id));
        setItems(newItems);
        setDeletes([]);
      })
      .catch();
  }
};
