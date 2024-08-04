import { LuArrowBigLeft, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "./planCalendar.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useState } from "react";
import { datesOfMonth } from "./utilities/date";

const PlanCalendar = () => {
  const [selects, setSelects] = useState<Date[]>([]);
  const today = new Date();
  const year = today.getFullYear();
  const curMonth = today.getMonth();
  const date = today.getDate();
  const [month, setMonth] = useState(curMonth);

  const dates = datesOfMonth(new Date(year, month, date));

  const weekOfDay: string[] = ["일", "월", "화", "수", "목", "금", "토"];

  const selectDate = (select: Date) => {
    console.log(select);

    if (selects.length === 0) {
      setSelects([select]);
    } else if (selects.length === 1) {
      const start = selects[0];
      const end = new Date(
        new Date(start).setDate(new Date(start).getDate() + 10)
      );
      if (start > select || select > end) {
        setSelects([select]);
      } else {
        const diff =
          (select.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

        console.log("diff", diff);

        const selected = [];
        for (let i = 0; i <= diff; i++) {
          const d = new Date(selects[0]);
          const e = new Date(new Date(d).setDate(new Date(d).getDate() + i));
          selected.push(e);

          console.log(selected);
        }
        setSelects([...selected]);
      }
    } else {
      setSelects([select]);
    }
  };

  const possible =
    selects[0] &&
    new Date(new Date(selects[0]).setDate(new Date(selects[0]).getDate() + 10));

  const selectsToString = [];
  for (let i = 0; i < selects.length; i++) {
    const str = selects[i].toLocaleDateString();
    selectsToString.push(str);
  }

  const selected = new Set(selectsToString);

  const setDate = new Date(year, month, date);
  console.log("날짜", setDate);
  console.log("날짜 배열", selects);

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
              {dates.map((date, index) => (
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
                      selects.length === 1 &&
                      selects[0] < new Date(year, month, date) &&
                      new Date(year, month, date) < possible) ||
                    (date - 1 > index &&
                      selects.length === 1 &&
                      selects[0] < new Date(year, month - 1, date))
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
        className={`plan-calendar-btn${selects.length > 1 ? " active" : ""}`}
      >
        <button>다음</button>
      </section>
    </div>
  );
};

export default PlanCalendar;
