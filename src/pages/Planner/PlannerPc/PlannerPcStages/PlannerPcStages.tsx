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

import PlannerPcPlaces from "./components/PlannerPcPlaces";
import { convertDateTypeToDate1, convertDateTypeToDate2 } from "utilities/date";
import { getPureletter } from "utilities/place";

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
  const [valid, setValid] = useState(false);
  const [title, setTitle] = useState("");

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
    }));

    return places;
  };

  useEffect(() => {
    dates.forEach((date) => {
      columns[convertDateTypeToDate2(date)] = [];
    });
  }, [dates]);

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
                      setSelectedDate={setSelectedDate}
                    />
                  </span>
                  <span className="calendar-container-double">
                    <Calendar
                      year={year}
                      month={month + 1}
                      dates={dates}
                      setDates={setDates}
                      setSelectedDate={setSelectedDate}
                      columns={columns}
                      setColumns={setColumns}
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
                date={date}
                setDate={setDate}
                dates={dates}
                columns={columns}
                setColumns={setColumns}
              />
            </div>
          ) : (
            <div className="planner-pc-stages-main-register">
              <div className="planner-pc-stages-main-register-header">
                <div className="planner-pc-stages-main-register-header-title">
                  <span className="planner-pc-stages-main-register-header-title-name">
                    <span className="icon">
                      <LuChevronRight />
                    </span>
                    제목<span style={{ color: "red" }}>*</span>
                  </span>
                  <span className="planner-pc-stages-main-register-header-title-detail">
                    {title.length}/50
                  </span>
                </div>
                <div className="planner-pc-stages-main-register-header-example">
                  <p className="example"> ex. 인천 일정 </p>
                  <p className="validation"> 최소 2개 이상 50 이내</p>
                </div>
                <input
                  type="text"
                  className="planner-pc-stages-main-register-header-textbox"
                  value={title}
                  onChange={(e) => handleTitle(e)}
                />
              </div>
              <div className="planner-pc-stages-main-register-plan">
                <div className="planner-pc-stages-main-register-plan-title">
                  <span className="icon">
                    <LuChevronRight />
                  </span>
                  일정
                </div>
                <ul className="planner-pc-stages-main-register-plan-container ">
                  {dates.map((date) => (
                    <Link to={`#places`} onClick={() => setDate(date)}>
                      <li className="planner-pc-stages-main-register-plan-individual">
                        <div className="planner-pc-stages-main-register-plan-individual-title">
                          <span className="individual-title-name">
                            {convertDateTypeToDate1(date)}
                          </span>
                          <span className="individual-title-detail">
                            관광지 : {countPlaces(date)} 숙소 :{" "}
                            {countAccommos(date)}
                          </span>
                        </div>
                        <div className="planner-pc-stages-main-register-plan-individual-data">
                          <span className="icon">
                            <LuCar />
                          </span>
                          <span className="places-list">
                            {getPlaces(date).map((place) => (
                              <>
                                <li
                                  className="places-list-item"
                                  key={place.title}
                                >
                                  <p
                                    className={`places-list-item${
                                      place.contentTypeId === "32"
                                        ? " accommo"
                                        : ""
                                    }`}
                                  >
                                    {place.contentTypeId === "32" ? (
                                      <span>
                                        <LuHotel />
                                      </span>
                                    ) : undefined}
                                    {place.title}
                                  </p>
                                  <span className="icon">
                                    <LuChevronRight />
                                  </span>
                                </li>
                              </>
                            ))}
                          </span>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
              <div className="planner-pc-stages-main-register-btn">
                <button
                  className={`register-btn${valid ? "-valid" : ""}`}
                  onClick={() => handleSubmit()}
                >
                  일정 등록 하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlannerPcStages;
