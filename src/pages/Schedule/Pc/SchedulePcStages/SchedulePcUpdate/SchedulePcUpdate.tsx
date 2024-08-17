import {
  convertDateToYYYYMMDD,
  convertDateTypeToDate1,
  convertDateTypeToDate2,
} from "utilities/date";
import "./schedulePcUpdate.css";
import { LuChevronRight, LuLoader2 } from "react-icons/lu";
import { ColumnType, ScheduleDetailDtoInputType } from "types/plan";
import { useCallback, useEffect, useState } from "react";
import { useRenderCount } from "@uidotdev/usehooks";

import { saveScheduleAPI } from "apis/schedule";
import { useNavigate } from "react-router-dom";
import { InfoType } from "pages/Planner/PlannerPc/PlannerPc";
import RegisterDate from "pages/Planner/PlannerPc/PlannerPcStages/PlannerPcRegister/RegisterDate/RegisterDate";

interface SchedulePcUpdateProps {
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
  allInfos: {
    [key: string]: (InfoType | undefined)[];
  };
  title: string;
  setTitle: (value: string) => void;
}

const SchedulePcUpdate = ({
  metroId,
  columns,
  setColumns,
  dates,
  selectedDate,
  setDate,
  setOpenMenu,
  allInfos,
  title,
  setTitle,
}: SchedulePcUpdateProps) => {
  const renderCount = useRenderCount();
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);

  const planValidObj: Record<string, boolean> = dates.reduce((acc, date) => {
    const dateString = convertDateTypeToDate2(date);
    acc[dateString] = true; // 문자열을 키로, false를 값으로 설정
    return acc;
  }, {} as Record<string, boolean>);
  const [planValid, setPlanValid] =
    useState<Record<string, boolean>>(planValidObj);

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

    console.log(value.length);

    if (value.length > 1 && value.length < 50) {
      setValid(true);
      setTitle(value);
      return;
    }
    if (value.length > 50) {
      window.alert(`제목은 50자 이내로 작성해주세요`);
      setValid(false);
      return;
    } else {
      setTitle(value);
      setValid(false);
      return;
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

  // 모든 일정 삭제하기
  const deleteAll = () => {
    if (!window.confirm(`일정을 삭제하시겠습니까?`)) {
      return;
    }
    const newColumns = dates?.reduce((acc, date) => {
      // 현재 날짜를 기반으로 빈 배열을 할당
      acc[convertDateTypeToDate2(date)] = [];
      return acc;
    }, {} as Record<string, any>); // 새로운 객체를 생성

    setColumns(newColumns);

    navigate(`/planner`);
  };

  console.log(valid);

  console.log(Object.values(planValid).every(Boolean));

  return (
    <div className="schedule-pc-update">
      <div className="schedule-pc-update-header">
        <div
          className="schedule-pc-update-header-title"
          onClick={() => setOpenHeader(!openHeader)}
        >
          <span className="schedule-pc-update-header-title-name">
            <span
              className={`schedule-pc-update-header-title-icon${
                openHeader ? " open" : ""
              }`}
            >
              <LuChevronRight />
            </span>
            제목<span style={{ color: "red" }}>*</span>
          </span>
        </div>
        <div
          className={`schedule-pc-update-header-container${
            openHeader ? " open" : ""
          }`}
        >
          <div className="schedule-pc-update-header-example">
            <p className="example"> ex. 인천 일정 </p>
            <p className="validation"> 최소 2개 이상 50 이내</p>
          </div>
          <div className="schedule-pc-update-header-text">
            <input
              type="text"
              className="schedule-pc-update-header-textbox"
              value={title}
              onChange={(e) => handleTitle(e)}
            />
            <span className="schedule-pc-update-header-title-detail">
              {title.length}/50
            </span>
          </div>
        </div>
      </div>

      <div className="schedule-pc-update-plan">
        <div
          className="schedule-pc-update-plan-title"
          onClick={() => setOpenPlan(!openPlan)}
        >
          <span className="schedule-pc-update-plan-title-left">
            <span
              className={`schedule-pc-update-plan-title-icon${
                openPlan ? " open" : ""
              }`}
            >
              <LuChevronRight />
            </span>
            <span className="schedule-pc-update-plan-title-name">일정</span>
          </span>

          {openPlan && (
            <span className="schedule-pc-update-plan-title-right">
              <p
                className="schedule-pc-update-plan-title-delete"
                onClick={() => deleteAll()}
              >
                모든 일정 삭제하기
              </p>
            </span>
          )}
        </div>

        <div
          className={`schedule-pc-update-plan-container${
            openPlan ? " open" : ""
          }`}
        >
          <div className="schedule-pc-update-plan-date-container">
            {dates.map((item, index) => {
              const column = columns[convertDateTypeToDate2(item)] || [];
              const infos = allInfos[convertDateTypeToDate2(item)] || [];

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
                  setPlanValid={setPlanValid}
                  infos={infos}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="schedule-pc-update-btn">
        <button
          className={`register-btn${
            valid && Object.values(planValid).every(Boolean) ? "-valid" : ""
          }${isSubmitting ? " submitting" : ""}`}
          onClick={
            valid && Object.values(planValid).every(Boolean)
              ? () => handleSubmit()
              : undefined
          }
        >
          <span>
            {isSubmitting ? (
              <span className="icon submitting">
                <LuLoader2 />
              </span>
            ) : (
              "일정 수정 하기"
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SchedulePcUpdate;
