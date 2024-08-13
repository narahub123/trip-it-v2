import { useState } from "react";
import "./plannerPcStages.css";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronUp,
  LuX,
} from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Calendar from "pages/Plan/components/Calendar";
import { ColumnType } from "types/plan";
import { PlaceApiType } from "types/place";
import PlannerAPIPlaceCard from "pages/Planner/PlannerPlace/PlannerCards/PlannerAPIPlaceCard";
import PlannerPcPlaces from "./components/PlannerPcPlaces";

export interface PlannerPcStagesProps {
  metroId: string;
  dates: Date[];
  setDates: (value: Date[]) => void;
}

const PlannerPcStages = ({
  metroId,
  dates,
  setDates,
}: PlannerPcStagesProps) => {
  const { hash } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const today = new Date();
  const year = today.getFullYear();
  const curMonth = today.getMonth();
  const [month, setMonth] = useState(curMonth);

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openAccordian, setOpenAccordian] = useState("");
  const [columns, setColumns] = useState<{ [key: string]: ColumnType[] }>({});
  const [title, setTitle] = useState("");
  const [valid, setValid] = useState(false);

  return (
    <>
      <div className="planner-pc-cover" />
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
            <div className="planner-pc-stages-main-calendars">
              <div className="planner-pc-stages-main-calendars-month">
                <span className="month-before" />
                <span className="month-title">
                  <span className="title-single">{`${month + 1}월`}</span>
                  <span className="title-double">{`${month + 2}월`}</span>
                </span>
                <span className="month-after" />
              </div>
              <div className="planner-pc-stages-main-calendars-container">
                <span
                  className="calendar-backward"
                  onClick={() => setMonth(month - 1)}
                >
                  <LuChevronLeft />
                </span>
                <span className="calendar-container">
                  <span className="calendar-container-single">
                    <Calendar
                      year={year}
                      month={month}
                      dates={dates}
                      setDates={setDates}
                    />
                  </span>
                  <span className="calendar-container-double">
                    <Calendar
                      year={year}
                      month={month + 1}
                      dates={dates}
                      setDates={setDates}
                    />
                  </span>
                </span>
                <span
                  className="calendar-forward"
                  onClick={() => setMonth(month + 1)}
                >
                  <LuChevronRight />
                </span>
              </div>
            </div>
          ) : hash === "#places" ? (
            <div className="planner-pc-stages-main-places">
              <PlannerPcPlaces
                metroId={metroId}
                dates={dates}
                columns={columns}
                setColumns={setColumns}
              />
            </div>
          ) : (
            <div className="planner-pc-stages-main-registers">등록</div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlannerPcStages;
