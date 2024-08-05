import { LuArrowBigLeft, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "./planCalendar.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useState } from "react";
import { datesOfMonth } from "./utilities/date";
import { useLocation, useNavigate } from "react-router-dom";

export interface PlanCalendarProps {
  dates: Date[];
  setDates: (value: Date[]) => void;
}

const PlanCalendar = ({ dates, setDates }: PlanCalendarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const [dates, setDates] = useState<Date[]>([]);
  const today = new Date();
  const year = today.getFullYear();
  const curMonth = today.getMonth();
  const date = today.getDate();
  const [month, setMonth] = useState(curMonth);

  const monthDates = datesOfMonth(new Date(year, month, date));

  const weekOfDay: string[] = ["일", "월", "화", "수", "목", "금", "토"];

  const selectDate = (select: Date) => {
    if (dates.length === 0) {
      setDates([select]);
    } else if (dates.length === 1) {
      const start = dates[0];
      const end = new Date(
        new Date(start).setDate(new Date(start).getDate() + 10)
      );
      if (start > select || select > end) {
        setDates([select]);
      } else {
        const diff =
          (select.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

        console.log("diff", diff);

        const selected = [];
        for (let i = 0; i <= diff; i++) {
          const d = new Date(dates[0]);
          const e = new Date(new Date(d).setDate(new Date(d).getDate() + i));
          selected.push(e);

          console.log(selected);
        }
        setDates([...selected]);
      }
    } else {
      setDates([select]);
    }
  };

  const possible =
    dates[0] &&
    new Date(new Date(dates[0]).setDate(new Date(dates[0]).getDate() + 10));

  const datesToString = [];
  for (let i = 0; i < dates.length; i++) {
    const str = dates[i].toLocaleDateString();
    datesToString.push(str);
  }

  const selected = new Set(datesToString);

  const setDate = new Date(year, month, date);
  console.log("날짜", setDate);
  console.log("날짜 배열", dates);
  console.log(`${pathname}#place`);

  return (
    <div className="plan-calendar">
      <div className="plan-calendar-title">
        <h3>캘린더</h3>
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
        <section className="plan-calendar-main-container">
          {/* <span className="plan-calendar-prev">
            <LuChevronLeft />
          </span> */}
          <span className="plan-calendar-grid">
            <ul className="plan-calendar-grid-container">
              {weekOfDay.map((day) => (
                <li
                  className={`plan-calendar-grid-item day ${
                    day === "일" ? "sunday" : day === "토" ? "saturday" : ""
                  }`}
                  key={day}
                >
                  {day}
                </li>
              ))}
              {monthDates.map((date, index) => (
                <li
                  className={`plan-calendar-grid-item date${
                    index % 7 === 0
                      ? " sunday"
                      : index % 7 === 6
                      ? " saturday"
                      : ""
                  }${
                    today.toLocaleDateString() ===
                    new Date(year, month, date).toLocaleDateString()
                      ? " today"
                      : ""
                  }${date - 1 > index ? " last-month" : ""}${
                    (date - 1 <= index &&
                      selected.has(
                        new Date(year, month, date).toLocaleDateString()
                      )) ||
                    (date - 1 > index &&
                      selected.has(
                        new Date(year, month - 1, date).toLocaleDateString()
                      ))
                      ? " selected"
                      : ""
                  }${
                    (date - 1 <= index &&
                      dates.length === 1 &&
                      dates[0] < new Date(year, month, date) &&
                      new Date(year, month, date) < possible) ||
                    (date - 1 > index &&
                      dates.length === 1 &&
                      dates[0] < new Date(year, month - 1, date))
                      ? " possible"
                      : ""
                  }`}
                  key={
                    date - 1 > index
                      ? `${year}${month - 1}${date}`
                      : `${year}${month}${date}`
                  }
                  onClick={
                    date - 1 <= index
                      ? () => selectDate(new Date(year, month, date))
                      : undefined
                  }
                >
                  {date}
                </li>
              ))}
            </ul>
          </span>
          {/* <span className="plan-calendar-next">
            <LuChevronRight />
          </span> */}
        </section>
      </div>

      <section
        className={`plan-calendar-btns${dates.length > 1 ? " active" : ""}`}
      >
        <button
          className="plan-calendar-btns-btn before"
          onClick={() => navigate(-1)}
        >
          이전
        </button>
        <button
          className={`plan-calendar-btns-btn next${
            dates.length > 1 ? " active" : ""
          }`}
          onClick={() => navigate(`#place`)}
        >
          다음
        </button>
      </section>
    </div>
  );
};

export default PlanCalendar;
