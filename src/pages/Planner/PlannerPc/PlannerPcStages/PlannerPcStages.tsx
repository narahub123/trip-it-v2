import { useEffect, useState } from "react";
import "./plannerPcStages.css";
import {
  LuAirplay,
  LuBedSingle,
  LuCar,
  LuChevronLeft,
  LuChevronRight,
  LuChevronUp,
  LuHotel,
  LuX,
} from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Calendar from "pages/Plan/components/Calendar";
import { ColumnType } from "types/plan";

import PlannerPcPlaces from "./PlannerPcPlaces/PlannerPcPlaces";
import { convertDateTypeToDate1, convertDateTypeToDate2 } from "utilities/date";
import { getPureletter } from "utilities/place";
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
          className="planner-pc-stages-header"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <span className="planner-pc-stages-header-btn">
            <p className="planner-pc-stages-header-btn-icon">
              <LuChevronLeft />
            </p>
          </span>
          <span className="planner-pc-stages-header-title">일정</span>
          <span className="planner-pc-stages-header-btn">
            <p className="planner-pc-stages-header-btn-icon">
              {openMenu ? <LuX /> : <LuChevronUp />}
            </p>
          </span>
        </div>
        <div className="planner-pc-stages-menus">
          <Link
            to={"#calendars"}
            className={`planner-pc-stages-menus-menu${
              hash === "#calendars" || !hash ? " active" : ""
            }`}
          >
            날짜
          </Link>
          <Link
            to={"#places"}
            className={`planner-pc-stages-menus-menu${
              hash === "#places" ? " active" : ""
            }`}
          >
            장소
          </Link>
          <Link
            to={"#register"}
            className={`planner-pc-stages-menus-menu${
              hash === "#register" ? " active" : ""
            } `}
          >
            등록
          </Link>
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
              columns={columns}
              setColumns={setColumns}
              dates={dates}
              setDate={setDate}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PlannerPcStages;
