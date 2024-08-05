import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PlanCalendar from "./PlanCalendar";

const Plan = () => {
  const { hash } = useLocation();
  const [dates, setDates] = useState<Date[]>([]);

  console.log(hash);
  console.log("선택 날짜", dates);

  return (
    <div className="plan">
      {(!hash || hash === "#calendar") && (
        <PlanCalendar dates={dates} setDates={setDates} />
      )}
    </div>
  );
};

export default Plan;
