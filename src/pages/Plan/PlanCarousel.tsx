import "./planCarousel.css";
import Calendar from "./components/Calendar";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
export interface PlanCarouselProps {
  year: number;
  month: number;
  date: number;
  dates: Date[];
  setDates: Dispatch<SetStateAction<Date[]>>;
}

const PlanCarousel = ({
  year,
  month,
  date,
  dates,
  setDates,
}: PlanCarouselProps) => {
  return (
    <div className="plan-carousel">
      <div className="plan-carousel-container">
        <Calendar
          year={year}
          month={month - 1}
          dates={dates}
          setDates={setDates}
        />
        <Calendar year={year} month={month} dates={dates} setDates={setDates} />
        <Calendar
          year={year}
          month={month + 1}
          dates={dates}
          setDates={setDates}
        />
      </div>
    </div>
  );
};

export default PlanCarousel;
