import { LuArrowBigLeft, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "./planCalendar.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useState } from "react";
import { CalcDatesOfMonth } from "./utilities/date";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from "./components/Calendar";

export interface PlanCalendarProps {
  dates: Date[];
  setDates: (value: Date[]) => void;
  metroId: string;
}

const PlanCalendar = ({ dates, setDates, metroId }: PlanCalendarProps) => {
  const navigate = useNavigate();

  const today = new Date();
  const year = today.getFullYear();
  const curMonth = today.getMonth();
  const date = today.getDate();
  const [month, setMonth] = useState(curMonth);

  return (
    <div className="plan-calendar">
      <div className="plan-calendar-title">
        <h3>날짜 설정</h3>
      </div>
      <div className="plan-calendar-main">
        <section className="plan-calendar-main-month">
          <span
            className="plan-calendar-main-month-prev"
            onClick={() => setMonth(month - 1)}
          >
            <IoIosArrowDropleft />
          </span>
          <span className="plan-calendar-main-month-current">
            {month + 1}월
          </span>
          <span
            className="plan-calendar-main-month-next"
            onClick={() => setMonth(month + 1)}
          >
            <IoIosArrowDropright />
          </span>
        </section>
        <section className="plan-calendar-main-calendar">
          <Calendar
            year={year}
            month={month}
            date={date}
            dates={dates}
            setDates={setDates}
          />
        </section>
      </div>

      <section
        className={`plan-calendar-btns${dates.length > 1 ? " active" : ""}`}
      >
        <button
          className="plan-calendar-btns-btn before"
          onClick={() => navigate(`/planner`)}
        >
          <p className="plan-calendar-btns-btn-icon before">
            <LuChevronLeft />
          </p>
          <p>지역</p>
        </button>
        <button
          className={`plan-calendar-btns-btn next${
            dates.length > 1 ? " active" : ""
          }`}
          onClick={() => navigate(`#place`)}
        >
          <p>장소</p>
          <p className="plan-calendar-btns-btn-icon next">
            <LuChevronRight />
          </p>
        </button>
      </section>
    </div>
  );
};

export default PlanCalendar;
