import { useEffect, useState } from "react";
import "./plannerPcStages.css";
import { LuChevronLeft, LuChevronUp, LuX } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { ColumnType } from "types/plan";
import PlannerPcPlaces from "./PlannerPcPlaces/PlannerPcPlaces";
import { convertDateTypeToDate2 } from "utilities/date";
import PlannerPcCalendar from "./PlannerPcCalender/PlannerPcCalendar";
import PlannerPcRegister from "./PlannerPcRegister/PlannerPcRegister";

export interface PlannerPcStagesProps {
  metroId: string;
  setSelectedDate: (value: Date) => void;
  dates: Date[];
  setDates: (value: Date[]) => void;
  columns: { [key: string]: ColumnType[] };
  setColumns: React.Dispatch<
    React.SetStateAction<{
      [key: string]: ColumnType[];
    }>
  >;
  date: Date;
  setDate: (value: Date) => void;
}

const PlannerPcStages = ({
  metroId,
  setSelectedDate,
  dates,
  setDates,
  columns,
  setColumns,
  date,
  setDate,
}: PlannerPcStagesProps) => {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(true);
  const today = new Date();
  const year = today.getFullYear();
  const curMonth = today.getMonth();
  const [month, setMonth] = useState(curMonth);

  useEffect(() => {
    dates.forEach((date) => {
      columns[convertDateTypeToDate2(date)] = [];
    });
  }, [dates]);

  const moveForward = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    if (hash === "#calendars") {
      navigate(`/planner`);
    } else if (hash === "#places") {
      navigate(`#calendars`);
    } else {
      navigate(`#places`);
    }
  };

  const validPlaces = () => {
    for (const date of dates) {
      const column = columns[convertDateTypeToDate2(date)];

      const tourPlaces = column.filter(
        (item) => item.place.contenttypeid !== "32"
      );
      const accommos = column.filter(
        (item) => item.place.contenttypeid === "32"
      );

      if (tourPlaces.length < 1) {
        window.alert(`${convertDateTypeToDate2(date)}의 장소를 선택해주세요.`);
        return false; // 즉시 함수 종료
      }

      if (accommos.length < 1) {
        window.alert(`${convertDateTypeToDate2(date)}의 숙소를 선택해주세요.`);
        return false; // 즉시 함수 종료
      }
    }

    return true; // 모든 날짜에 대해 유효한 경우
  };

  const handleMoveTo = (destiny: string) => {
    if (destiny === "#places") {
      if (dates.length < 2) {
        window.alert(`날짜 선택을 완료해주세요`);
        return;
      }
      navigate(`#places`);
    } else if (destiny === "#register") {
      if (dates.length < 2) {
        window.alert(`날짜 선택을 완료해주세요`);
        navigate(`#calendars`);
        return;
      }
      if (validPlaces()) {
        navigate(`#register`);
      }
    }
  };

  return (
    <>
      {openMenu && (
        <div
          className="planner-pc-cover"
          onClick={() => setOpenMenu(!openMenu)}
        />
      )}
      <div
        className={`planner-pc-stages${
          openMenu && (hash === "#calendars" || !hash)
            ? " calendars"
            : openMenu && hash === "#places"
            ? " places"
            : openMenu && hash === "#register"
            ? " register"
            : ""
        }`}
      >
        <div
          className={`planner-pc-stages-header${openMenu ? "" : " close"}`}
          onClick={() => setOpenMenu(!openMenu)}
        >
          <span
            className="planner-pc-stages-header-btn"
            onClick={(e) => moveForward(e)}
          >
            {openMenu && (
              <p className="planner-pc-stages-header-btn-icon">
                <LuChevronLeft />
              </p>
            )}
          </span>
          <span
            className={`planner-pc-stages-header-title${
              openMenu ? "" : " close"
            }`}
          >
            <p>일정</p>
            <p>
              {hash === "#calendars"
                ? " (날짜 선택)"
                : hash === "#places"
                ? " (장소 선택)"
                : " (일정 등록)"}
            </p>
          </span>
          <span className="planner-pc-stages-header-btn">
            <p className="planner-pc-stages-header-btn-icon">
              {openMenu ? <LuX /> : <LuChevronUp />}
            </p>
          </span>
        </div>
        <div className="planner-pc-stages-menus">
          <li
            className={`planner-pc-stages-menus-menu${
              hash === "#calendars" || !hash ? " active" : ""
            }`}
            onClick={() => navigate(`#calendars`)}
          >
            날짜
          </li>
          <li
            className={`planner-pc-stages-menus-menu${
              hash === "#places" ? " active" : ""
            }`}
            onClick={() => handleMoveTo(`#places`)}
          >
            장소
          </li>
          <li
            className={`planner-pc-stages-menus-menu${
              hash === "#register" ? " active" : ""
            } `}
            onClick={() => handleMoveTo(`#register`)}
          >
            등록
          </li>
        </div>
        <div className="planner-pc-stages-main">
          {!hash || hash === "#calendars" ? (
            <PlannerPcCalendar
              year={year}
              month={month}
              setMonth={setMonth}
              dates={dates}
              setDates={setDates}
              setSelectedDate={setSelectedDate}
              columns={columns}
              setColumns={setColumns}
            />
          ) : hash === "#places" ? (
            <div className="planner-pc-stages-main-places">
              <PlannerPcPlaces
                metroId={metroId}
                date={date}
                setDate={setDate}
                dates={dates}
                columns={columns}
                setColumns={setColumns}
              />
            </div>
          ) : (
            <PlannerPcRegister
              metroId={metroId}
              columns={columns}
              setColumns={setColumns}
              dates={dates}
              selectedDate={date}
              setDate={setDate}
              setOpenMenu={setOpenMenu}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PlannerPcStages;
