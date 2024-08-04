import { LuArrowBigLeft, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "./planCalendar.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useState } from "react";

const PlanCalendar = () => {
  const [selects, setSelects] = useState<Date[]>([]);
  const today = new Date();
  const year = today.getFullYear();
  const curMonth = today.getMonth();
  const date = today.getDate();
  const [month, setMonth] = useState(curMonth);
  const datesOfMonth = [];
  for (let i = 1; i < 31; i++) {
    datesOfMonth.push(i);
  }
  const weekOfDay: string[] = ["일", "월", "화", "수", "목", "금", "토"];

  const selectDate = (select: Date) => {
    const possible = [];

    for (let i = 0; i < 10; i++) {
      const origin = new Date(select);
      const date = new Date(origin.setDate(origin.getDate() + i));

      possible.push(date);
    }

    console.log("10일 후", possible);

    const selected = new Set(possible);

    if (!selected.has(select)) {
      setSelects([...possible]);
    } else if (selected.has(select)) {
      setSelects([select]);
    }
  };

  const setDate = new Date(year, month, date);
  console.log("날짜", setDate);
  console.log(selects);

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
          <span className="plan-calendar-prev">
            <LuChevronLeft />
          </span>
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
              {datesOfMonth.map((date, index) => (
                <li
                  className={`plan-calendar-grid-item date ${
                    index % 7 === 0
                      ? "sunday"
                      : index % 7 === 6
                      ? "saturday"
                      : today.toLocaleDateString() ===
                        new Date(year, month, date).toLocaleDateString()
                      ? "today"
                      : ""
                  }`}
                  key={`${year}${month}${date}`}
                  onClick={() => selectDate(new Date(year, month, date))}
                >
                  {date}
                </li>
              ))}
            </ul>
          </span>
          <span className="plan-calendar-next">
            <LuChevronRight />
          </span>
        </section>
      </div>
    </div>
  );
};

export default PlanCalendar;
