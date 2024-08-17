import {
  convertDateToYYYYMMDD,
  convertDateTypeToDate1,
  convertDateTypeToDate2,
} from "utilities/date";
import "./schedulePcUpdate.css";
import { LuChevronRight, LuLoader2 } from "react-icons/lu";
import { ColumnType, ScheduleDetailDtoUpdateType } from "types/plan";
import { useCallback, useEffect, useState } from "react";
import { useRenderCount } from "@uidotdev/usehooks";
import { updateScheduleAPI } from "apis/schedule";
import { useNavigate } from "react-router-dom";
import { InfoType } from "pages/Planner/PlannerPc/PlannerPc";
import RegisterDate from "pages/Planner/PlannerPc/PlannerPcStages/PlannerPcRegister/RegisterDate/RegisterDate";
import { ScheduleDetailType, ScheduleType } from "types/schedule";

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
  schedule: ScheduleType;
  scheduleDetails: ScheduleDetailType[];
  requesting: boolean;
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
  schedule,
  scheduleDetails,
  requesting,
}: SchedulePcUpdateProps) => {
  const renderCount = useRenderCount();
  const navigate = useNavigate();
  const [valid, setValid] = useState(true);
  const [title, setTitle] = useState(schedule.scheduleTitle);

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
  const [changed, setChanged] = useState(false);

  console.log("렌더링 횟수", renderCount);

  // useEffect 훅 개선
  useEffect(() => {
    const start = convertDateToYYYYMMDD(dates[0]);
    const end = convertDateToYYYYMMDD(dates[dates.length - 1]);

    console.log(title);

    // 제목 변경 여부 확인
    if (schedule.scheduleTitle !== title) {
      console.log("제목 바뀜");
      setChanged(true);
      return;
    }
    // 날짜 변경 여부 확인
    if (schedule.startDate !== start || schedule.endDate !== end) {
      setChanged(true);
      console.log("날짜 바뀜");
      return;
    }

    // 일정 세부사항이 변경된 경우
    const hasChanges = Object.values(columns)
      .flat()
      .some((item, index) => {
        const detail = scheduleDetails[index];
        return (
          item.scheduleOrder !== detail.scheduleOrder ||
          item.startTime !== detail.startTime ||
          item.endTime !== detail.endTime ||
          item.place.contentid !== detail.contentId
        );
      });

    if (hasChanges) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [columns, dates, title]);

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
    const value = e.currentTarget.value;

    console.log(value);

    console.log(schedule.scheduleTitle);

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

      // 다른 날짜로 이동하는 경우, order도 바꿔야 함
    } else {
      const [movedItem] = curColumn.splice(curColIndex, 1);

      const order = dates.findIndex(
        (date) => convertDateTypeToDate2(date) === newRow
      );

      const newItem: ColumnType = { ...movedItem, scheduleOrder: order };

      targetColumn.splice(newColIndex, 0, newItem);

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

  // 제출하기
  const handleUpdate = () => {
    if (!title) return window.alert("일정 제목을 적어주세요");
    const start = convertDateToYYYYMMDD(dates[0]);
    const end = convertDateToYYYYMMDD(dates[dates.length - 1]);

    setIsSubmitting(true);

    const values = Object.values(columns);

    const newScheduleDetails: ScheduleDetailDtoUpdateType[] = [];
    for (let i = 0; i < values.length; i++) {
      const column = values[i];

      for (const detail of column) {
        const oldDetail = scheduleDetails.find(
          (d) =>
            d.contentId === detail.place.contentid &&
            d.scheduleOrder === detail.scheduleOrder &&
            d.startTime === detail.startTime &&
            d.endTime === detail.endTime
        );

        if (oldDetail) {
          const newDetail: ScheduleDetailDtoUpdateType = {
            scheduleDetailId: oldDetail?.scheduleDetailId,
            scheduleId: oldDetail.scheduleId,
            contentId: detail.place.contentid,
            scheduleOrder: i,
            startTime: detail.startTime,
            endTime: detail.endTime,
          };
          newScheduleDetails.push(newDetail);
        } else {
          const scheduleId = scheduleDetails[0].scheduleId;
          const newDetail: ScheduleDetailDtoUpdateType = {
            scheduleId,
            contentId: detail.place.contentid,
            scheduleOrder: i,
            startTime: detail.startTime,
            endTime: detail.endTime,
          };
          newScheduleDetails.push(newDetail);
        }
      }
    }

    const submitValue = {
      scheduleDto: {
        scheduleId: schedule.scheduleId,
        metroId: metroId,
        startDate: start,
        endDate: end,
        scheduleTitle: title,
      },

      detailScheduleDto: newScheduleDetails,
    };

    console.log(submitValue);

    // 수정 api 필요
    updateScheduleAPI(submitValue)
      .then((res) => {
        console.log(res.data);
        if (!res) return;

        if (res.status === 200) {
          setIsSubmitting(false);
          console.log("수정 성공");
          setValid(false);
          // navigate("/mypage/schedules");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="schedule-pc-update">
      <div className="schedule-pc-update-content">
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
                defaultValue={title}
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
                    requesting={requesting}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="schedule-pc-update-btn">
          <button
            className={`register-btn${
              valid && Object.values(planValid).every(Boolean) && changed
                ? "-valid"
                : ""
            }${isSubmitting ? " submitting" : ""}`}
            onClick={
              valid && Object.values(planValid).every(Boolean) && changed
                ? () => handleUpdate()
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
    </div>
  );
};

export default SchedulePcUpdate;
