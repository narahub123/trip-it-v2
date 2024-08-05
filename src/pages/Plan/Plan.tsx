import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PlanCalendar from "./PlanCalendar";
import PlanPlaces from "./PlanPlaces";

const Plan = () => {
  const { hash } = useLocation();
  const { pathname } = useLocation();
  const metroId = pathname.split("/")[2];
  console.log("지역 번호", metroId);

  const [dates, setDates] = useState<Date[]>([]);

  console.log(hash);
  console.log("선택 날짜", dates);

  return (
    <div className="plan">
      {!hash || hash === "#calendar" ? (
        <PlanCalendar dates={dates} setDates={setDates} />
      ) : (
        <PlanPlaces metroId={metroId} />
      )}
    </div>
  );
};

export default Plan;
