import { convertDateTypeToDate1, convertDateTypeToDate2 } from "utilities/date";
import "./plannerPcRegister.css";
import {
  LuCar,
  LuChevronRight,
  LuGripVertical,
  LuHotel,
  LuMove,
} from "react-icons/lu";
import { ColumnType } from "types/plan";
import { getPureletter } from "utilities/place";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useRenderCount } from "@uidotdev/usehooks";
interface PlannerPcRegisterProps {
  columns: { [key: string]: ColumnType[] };
  setColumns: React.Dispatch<
    React.SetStateAction<{
      [key: string]: ColumnType[];
    }>
  >;
  dates: Date[];
  setDate: (value: Date) => void;
}
const PlannerPcRegister = ({
  columns,
  setColumns,
  dates,
  setDate,
}: PlannerPcRegisterProps) => {
  const renderCount = useRenderCount();
  const [valid, setValid] = useState(false);
  const [title, setTitle] = useState("");
  const [openHeader, setOpenHeader] = useState(true);
  const [openPlan, setOpenPlan] = useState(true);
  const [droppable, setDroppable] = useState(false);

  console.log("렌더링 횟수", renderCount);

  const countPlaces = (date: Date) => {
    const column = columns[convertDateTypeToDate2(date)];

    const count = column.filter(
      (col) => col.place.contenttypeid !== "32"
    ).length;

    return count;
  };

  const countAccommos = (date: Date) => {
    const column = columns[convertDateTypeToDate2(date)];

    const count = column.filter(
      (col) => col.place.contenttypeid === "32"
    ).length;

    return count;
  };

  const getPlaces = (date: Date) => {
    const column = columns[convertDateTypeToDate2(date)];

    const places = column.map((col) => ({
      title: getPureletter(col.place.title),
      contentTypeId: col.place.contenttypeid,
      contentId: col.place.contentid,
    }));

    return places;
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value.trim();

    setTitle(value);

    if (value.length > 1) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleSubmit = () => {
    if (!window.confirm(`일정을 등록하시겠습니까?`)) return;
  };

  const dragStart = (e: React.DragEvent<HTMLLIElement>) => {
    const curCol = e.currentTarget.dataset.col;
    const curRow = e.currentTarget.dataset.row;

    if (!curCol || !curRow) return;
    e.dataTransfer.setData("curCol", curCol);
    e.dataTransfer.setData("curRow", curRow);
  };
  const dragOver = useCallback((e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault(); // 기본 동작 방지

    setDroppable(true);
  }, []);

  const dragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault(); // 기본 동작 방지

    setDroppable(false);
  };

  const drop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault(); // 기본 동작 방지 필수
    const curCol = e.dataTransfer.getData("curCol"); // index
    const curRow = e.dataTransfer.getData("curRow"); // date
    const newCol = e.currentTarget.dataset.col; // index
    const newRow = e.currentTarget.dataset.row; // date

    if (!newCol || !newRow || !curCol || !curRow) return;

    const curColIndex = Number(curCol);
    const newColIndex = Number(newCol);

    if (curRow === newRow && curColIndex === newColIndex) return;

    // 상태 복사 : 불변성 유지를 위해서
    const updatedColumns = { ...columns };

    // 현재 날짜 컬럼
    const curColumn = [...(updatedColumns[curRow] || [])];
    // 대상 날짜 컬럼
    const targetColumn = [...(updatedColumns[newRow] || [])];

    // 같은 날짜 안에서 이동하는  경우: 순서만 바꿔주면 됨
    if (curRow === newRow) {
      // 기존 데이터 삭제
      const [movedItem] = curColumn.splice(curColIndex, 1);

      curColumn.splice(newColIndex, 0, movedItem);

      // 변경된 현재 날짜 컬럼 업데이트
      updatedColumns[curRow] = curColumn;

      // 다른 날짜로 이동하는 경우
    } else {
      const [movedItem] = curColumn.splice(curColIndex, 1);
      targetColumn.splice(newColIndex, 0, movedItem);

      updatedColumns[curRow] = curColumn;
      updatedColumns[newRow] = targetColumn;
    }

    setColumns(updatedColumns);

    setDroppable(false);
  };

  console.log(Object.keys(columns));

  return (
    <div className="planner-pc-register">
      <div className="planner-pc-register-header">
        <div
          className="planner-pc-register-header-title"
          onClick={() => setOpenHeader(!openHeader)}
        >
          <span className="planner-pc-register-header-title-name">
            <span
              className={`planner-pc-register-header-title-icon${
                openHeader ? " open" : ""
              }`}
            >
              <LuChevronRight />
            </span>
            제목<span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div
          className={`planner-pc-register-header-container${
            openHeader ? " open" : ""
          }`}
        >
          <div className="planner-pc-register-header-example">
            <p className="example"> ex. 인천 일정 </p>
            <p className="validation"> 최소 2개 이상 50 이내</p>
          </div>
          <div className="planner-pc-register-header-text">
            <input
              type="text"
              className="planner-pc-register-header-textbox"
              value={title}
              onChange={(e) => handleTitle(e)}
            />
            <span className="planner-pc-register-header-title-detail">
              {title.length}/50
            </span>
          </div>
        </div>
      </div>

      <div className="planner-pc-register-plan">
        <div
          className="planner-pc-register-plan-title"
          onClick={() => setOpenPlan(!openPlan)}
        >
          <span
            className={`planner-pc-register-plan-title-icon${
              openPlan ? " open" : ""
            }`}
          >
            <LuChevronRight />
          </span>
          <span className="planner-pc-register-plan-title-name">일정</span>
        </div>

        <ul
          className={`planner-pc-register-plan-container${
            openPlan ? " open" : ""
          }`}
        >
          {Object.keys(columns).length === 0 && (
            <li className="planner-pc-register-plan-date">
              <span className="planner-pc-register-plan-date-info">
                <span className="planner-pc-register-plan-date-title">
                  날짜와 장소를 선택해주세요
                </span>
              </span>
            </li>
          )}
          {dates.map((date) => (
            <li
              className="planner-pc-register-plan-date"
              draggable
              data-row={convertDateTypeToDate2(date)}
            >
              <span className="planner-pc-register-plan-date-info">
                <Link
                  to={`#places`}
                  className="planner-pc-register-plan-date-title"
                  onClick={() => setDate(date)}
                >
                  {convertDateTypeToDate1(date)} :
                </Link>
                <span className="planner-pc-register-plan-date-places">
                  <ul className="planner-pc-register-plan-date-places-container">
                    {getPlaces(date).map((item, index, array) => {
                      if (index !== array.length - 1) {
                        return (
                          <>
                            <li
                              key={`${item.contentId}${index}`}
                              className={`planner-pc-register-plan-date-places-item${
                                item.contentTypeId === "32" ? " accommo" : ""
                              }`}
                              draggable
                              data-row={convertDateTypeToDate2(date)}
                              data-col={index}
                              onDragOver={(e) => dragOver(e)}
                              onDragStart={(e) => dragStart(e)}
                              onDragEnd={(e) => dragEnd(e)}
                              onDrop={(e) => drop(e)}
                            >
                              {getPureletter(item.title)}
                            </li>
                            <span className="icon">
                              <LuChevronRight />
                            </span>
                          </>
                        );
                      } else if (index === array.length - 1) {
                        return (
                          <li
                            className={`planner-pc-register-plan-date-places-item${
                              item.contentTypeId === "32" ? " accommo" : ""
                            }`}
                            data-row={convertDateTypeToDate2(date)}
                            data-col={index}
                            draggable
                            onDragOver={(e) => dragOver(e)}
                            onDragStart={(e) => dragStart(e)}
                            onDragEnd={(e) => dragEnd(e)}
                            onDrop={(e) => drop(e)}
                          >
                            {getPureletter(item.title)}
                          </li>
                        );
                      }
                    })}
                  </ul>
                </span>
              </span>

              <span className="planner-pc-register-plan-date-drag">
                <LuGripVertical />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="planner-pc-register-btn">
        <button
          className={`register-btn${valid ? "-valid" : ""}`}
          onClick={() => handleSubmit()}
        >
          일정 등록 하기
        </button>
      </div>
    </div>
  );
};

export default PlannerPcRegister;
