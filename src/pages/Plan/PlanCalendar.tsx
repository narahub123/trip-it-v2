import { LuArrowBigLeft, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "./planCalendar.css";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlanCarousel from "./PlanCarousel";
import Calendar from "./components/Calendar";

export interface PlanCalendarProps {
  dates: Date[];
  setDates: Dispatch<SetStateAction<Date[]>>;
}

const PlanCalendar = ({ dates, setDates }: PlanCalendarProps) => {
  const navigate = useNavigate();

  const today = new Date();
  const year = today.getFullYear();
  const curMonth = today.getMonth();
  const date = today.getDate();
  const [month, setMonth] = useState(curMonth);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;

    const touchEndX = e.touches[0].clientX;
    const touchDiff = touchStartX - touchEndX;

    if (Math.abs(touchDiff) > 100) {
      // 터치 이동 거리가 100픽셀 이상일 때
      if (touchDiff > 0) {
        // 오른쪽에서 왼쪽으로 스크롤 (다음 달로 이동)
        setMonth((prevMonth) => (prevMonth + 1) % 12);
      } else {
        // 왼쪽에서 오른쪽으로 스크롤 (이전 달로 이동)
        setMonth((prevMonth) => (prevMonth - 1 + 12) % 12);
      }
      setTouchStartX(null); // 터치 시작 위치 리셋
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  return (
    <div
      className="plan-calendar"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
