import {
  convertDateToYYYYMMDD,
  convertDateTypeToDate1,
  convertDateTypeToDate2,
} from "utilities/date";
import "./plannerPcRegister.css";
import { LuChevronRight, LuLoader2 } from "react-icons/lu";
import { ColumnType, ScheduleDetailDtoInputType } from "types/plan";

import { useCallback, useState } from "react";

import { useRenderCount } from "@uidotdev/usehooks";
import RegisterDate from "./RegisterDate/RegisterDate";
import { saveScheduleAPI } from "apis/schedule";
import { useNavigate } from "react-router-dom";

interface PlannerPcRegisterProps {
  metroId: string;
  columns: { [key: string]: ColumnType[] };
  setColumns: React.Dispatch<
    React.SetStateAction<{
      [key: string]: ColumnType[];
    }>
  >;
  dates: Date[];
  selectedDate: Date;
  setDate: (value: Date) => void;
  setOpenMenu: (value: boolean) => void;
}

const PlannerPcRegister = ({
  metroId,
  columns,
  setColumns,
  dates,
  selectedDate,
  setDate,
  setOpenMenu,
}: PlannerPcRegisterProps) => {
  const renderCount = useRenderCount();
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);
  const [title, setTitle] = useState("");
  const [openHeader, setOpenHeader] = useState(true);
  const [openPlan, setOpenPlan] = useState(true);
  const [droppable, setDroppable] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.value;

    setTitle(value);

    if (value.length > 1) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleSubmit = () => {
    if (!title) return window.alert("일정 제목을 적어주세요");
    if (!window.confirm(`일정을 등록하시겠습니까?`)) return;
    const start = convertDateToYYYYMMDD(dates[0]);
    const end = convertDateToYYYYMMDD(dates[dates.length - 1]);

    console.log(start, end);

    setIsSubmitting(true);

    const scheduleDetails: ScheduleDetailDtoInputType[] = [];
    const values = Object.values(columns);

    for (let i = 0; i < values.length; i++) {
      const column = values[i];
      for (const detail of column) {
        const newDetail: ScheduleDetailDtoInputType = {
          contentId: detail.place.contentid,
          scheduleOrder: detail.scheduleOrder,
          startTime: detail.startTime,
          endTime: detail.endTime,
        };
        scheduleDetails.push(newDetail);
      }
    }

    const submitValue = {
      scheduleDto: {
        metroId: metroId,
        startDate: start,
        endDate: end,
        scheduleTitle: title,
      },
      detailScheduleDto: scheduleDetails,
    };

    console.log(submitValue);

    saveScheduleAPI(submitValue)
      .then((res) => {
        console.log(res.data);
        if (!res) return;

        if (res.status === 200) {
          setIsSubmitting(false);
          console.log("등록 성공");
          navigate("/mypage/schedules");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };

  const dragStart = (e: React.DragEvent<HTMLLIElement>) => {
    e.stopPropagation();
    const curCol = e.currentTarget.dataset.col;
    const curRow = e.currentTarget.dataset.row;

    if (!curCol || !curRow) return;

    e.dataTransfer.setData("curCol", curCol);
    e.dataTransfer.setData("curRow", curRow);
  };

  const dragOver = useCallback((e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault(); // 기본 동작 방지
    e.stopPropagation();

    // 현재 드래그 대상의 데이터 가져오기
    const newCol = e.currentTarget.dataset.col;
    const newRow = e.currentTarget.dataset.row;

    console.log(newCol, newRow);

    // 데이터가 모두 있는지 확인
    if (!newCol || !newRow) return;

    // 현재 상태와 같은 경우 업데이트를 방지
    setDroppable((prev) => {
      const [prevRow, prevCol] = prev;
      if (prevRow === newRow && prevCol === newCol) return prev;
      return [newRow, newCol];
    });
  }, []);

  const dragEnd = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault(); // 기본 동작 방지
    e.stopPropagation();

    setDroppable([]);
  };

  const drop = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault(); // 기본 동작 방지 필수
    e.stopPropagation();
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

    setDroppable([]);
  };

  const handleDateDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.stopPropagation();
    if (droppable.length !== 0) return;
    const curRow = e.currentTarget.dataset.row;

    console.log(curRow);
    if (!curRow) return;
    e.dataTransfer.setData("curRow", curRow);
  };

  const handleDateDragEnd = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDateDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (droppable.length !== 0) return;

    const newRow = e.currentTarget.dataset.row;

    if (!newRow) return;
  };
  const handleDateDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newRow = e.currentTarget.dataset.row;
    const curRow = e.dataTransfer.getData("curRow");

    if (curRow === newRow || !newRow) return;

    const updatedColumns = { ...columns };

    // 현재 날짜 컬럼
    const curColumn = [...(updatedColumns[curRow] || [])];
    // 대상 날짜 컬럼
    const targetColumn = [...(updatedColumns[newRow] || [])];

    updatedColumns[newRow] = curColumn;
    updatedColumns[curRow] = targetColumn;

    setColumns(updatedColumns);
  };

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

        <div
          className={`planner-pc-register-plan-container${
            openPlan ? " open" : ""
          }`}
        >
          <div className="planner-pc-register-plan-date-container">
            {dates.map((item, index) => {
              const column = columns[convertDateTypeToDate2(item)];
              return (
                <RegisterDate
                  key={convertDateTypeToDate1(item)}
                  setOpenMenu={setOpenMenu}
                  index={index}
                  curDate={item}
                  selectedDate={selectedDate}
                  setDate={setDate}
                  dates={dates}
                  metroId={metroId}
                  column={column}
                  columns={columns}
                  setColumns={setColumns}
                  dragStart={dragStart}
                  dragOver={dragOver}
                  dragEnd={dragEnd}
                  drop={drop}
                  droppable={droppable}
                  handleDateDragStart={handleDateDragStart}
                  handleDateDragOver={handleDateDragOver}
                  handleDateDragEnd={handleDateDragEnd}
                  handleDateDrop={handleDateDrop}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="planner-pc-register-btn">
        <button
          className={`register-btn${valid ? "-valid" : ""}${
            isSubmitting ? " submitting" : ""
          }`}
          onClick={() => handleSubmit()}
        >
          <span>
            {isSubmitting ? (
              <span className="icon submitting">
                <LuLoader2 />
              </span>
            ) : (
              "일정 등록 하기"
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default PlannerPcRegister;
