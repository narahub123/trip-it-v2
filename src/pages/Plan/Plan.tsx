import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlanCalendar from "./PlanCalendar";
import PlanPlaces from "./PlanPlaces";
import PlanSubmit from "./PlanSubmit";
import { convertDateTypeToDate2 } from "utilities/date";
import { ColumnType, ScheduleDetailDtoInputType } from "types/plan";
import { PlaceApiType } from "types/place";

const Plan = () => {
  const { hash } = useLocation();
  const { pathname } = useLocation();
  const metroId = pathname.split("/")[2];
  console.log("지역 번호", metroId);

  const [selectedPlaces, setSelectedPlaces] = useState<PlaceApiType[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [columns, setColumns] = useState<{
    [key: string]: ColumnType[];
  }>({});

  useEffect(() => {
    dates.forEach((date) => {
      columns[convertDateTypeToDate2(date)] = [];
    });
  }, [dates]);

  console.log(hash);
  console.log("선택 날짜", dates);

  console.log("컬럼", columns);

  return (
    <div className="plan">
      {!hash || hash === "#calendar" ? (
        <PlanCalendar dates={dates} setDates={setDates} />
      ) : hash === "#place" ? (
        <PlanPlaces
          metroId={metroId}
          dates={dates}
          selectedPlaces={selectedPlaces}
          setSelectedPlaces={setSelectedPlaces}
          columns={columns}
        />
      ) : (
        <PlanSubmit
          metroId={metroId}
          dates={dates}
          selectedPlaces={selectedPlaces}
          setSelectedPlaces={setSelectedPlaces}
          columns={columns}
          setColumns={setColumns}
        />
      )}
    </div>
  );
};

export default Plan;
