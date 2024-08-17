import "./schedulePcStages.css";
import { PlannerPcStagesProps } from "pages/Planner/PlannerPc/PlannerPcStages/PlannerPcStages";
import { useState } from "react";
import { LuChevronLeft, LuChevronUp, LuX } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { convertDateTypeToDate2 } from "utilities/date";
import SchedulePcUpdate from "./SchedulePcUpdate/SchedulePcUpdate";
import SchedulePcPlaces from "./SchedulePcPlaces/SchedulePcPlaces";
import SchedulePcCalendars from "./SchedulePcCalendar/SchedulePcCalendars";
import { ScheduleDetailType, ScheduleType } from "types/schedule";

export interface SchedulePcStageProps extends PlannerPcStagesProps {
  title: string;
  setTitle: (value: string) => void;
  schedule: ScheduleType;
  scheduleDetails: ScheduleDetailType[];
  requesting: boolean;
}

const SchedulePcStages = ({
  metroId,
  setSelectedDate,
  dates,
  setDates,
  columns,
  setColumns,
  date,
  setDate,
  infos,
  allInfos,
  title,
  setTitle,
  schedule,
  scheduleDetails,
  requesting,
}: SchedulePcStageProps) => {
  const { hash, state } = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(true);
  const today = new Date();
  const year = today.getFullYear();
  const curMonth = today.getMonth();
  const [month, setMonth] = useState(curMonth);

  const moveForward = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    if (hash === "#calendars") {
      navigate(`/mypage/schedules`);
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
      navigate(`#places`, { state });
    } else if (destiny === "#update") {
      if (dates.length < 2) {
        window.alert(`날짜 선택을 완료해주세요`);
        navigate(`#calendars`, { state });
        return;
      }
      if (validPlaces()) {
        navigate(`#update`, { state });
      }
    }
  };

  return (
    <>
      {openMenu && (
        <div
          className="schedule-pc-cover"
          onClick={() => setOpenMenu(!openMenu)}
        />
      )}
      <div
        className={`schedule-pc-stages${
          openMenu && hash === "#calendars"
            ? " calendars"
            : openMenu && hash === "#places"
            ? " places"
            : openMenu && (hash === "#update" || !hash)
            ? " update"
            : ""
        }`}
      >
        <div
          className={`schedule-pc-stages-header${openMenu ? "" : " close"}`}
          onClick={() => setOpenMenu(!openMenu)}
        >
          <span
            className="schedule-pc-stages-header-btn"
            onClick={(e) => moveForward(e)}
          >
            {openMenu && (
              <p className="schedule-pc-stages-header-btn-icon">
                <LuChevronLeft />
              </p>
            )}
          </span>
          <span
            className={`schedule-pc-stages-header-title${
              openMenu ? "" : " close"
            }`}
          >
            <p>일정</p>
            {!openMenu && (
              <p>
                {hash === "#calendars"
                  ? " (날짜 선택 중)"
                  : hash === "#places"
                  ? " (장소 선택 중)"
                  : " (일정 수정 중)"}
              </p>
            )}
          </span>
          <span className="schedule-pc-stages-header-btn">
            <p className="schedule-pc-stages-header-btn-icon">
              {openMenu ? <LuX /> : <LuChevronUp />}
            </p>
          </span>
        </div>
        <div className="schedule-pc-stages-menus">
          <li
            className={`schedule-pc-stages-menus-menu${
              hash === "#calendars" ? " active" : ""
            }`}
            onClick={() => navigate(`#calendars`, { state })}
          >
            날짜
          </li>
          <li
            className={`schedule-pc-stages-menus-menu${
              hash === "#places" ? " active" : ""
            }`}
            onClick={() => handleMoveTo(`#places`)}
          >
            장소
          </li>
          <li
            className={`schedule-pc-stages-menus-menu${
              hash === "#update" || !hash ? " active" : ""
            } `}
            onClick={() => handleMoveTo(`#update`)}
          >
            등록
          </li>
        </div>
        <div className="schedule-pc-stages-main">
          {hash === "#calendars" ? (
            <SchedulePcCalendars
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
            <div className="schedule-pc-stages-main-places">
              <SchedulePcPlaces
                metroId={metroId}
                date={date}
                setDate={setDate}
                dates={dates}
                columns={columns}
                setColumns={setColumns}
                infos={infos}
              />
            </div>
          ) : !hash || hash === "#update" ? (
            <SchedulePcUpdate
              metroId={metroId}
              columns={columns}
              setColumns={setColumns}
              dates={dates}
              selectedDate={date}
              setDate={setDate}
              setOpenMenu={setOpenMenu}
              allInfos={allInfos}
              title={title}
              setTitle={setTitle}
              schedule={schedule}
              scheduleDetails={scheduleDetails}
              requesting={requesting}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default SchedulePcStages;
