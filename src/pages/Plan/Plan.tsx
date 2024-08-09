import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PlanCalendar from "./PlanCalendar";
import PlanPlaces from "./PlanPlaces";
import PlanSubmit from "./PlanSubmit";
import { convertDateTypeToDate2 } from "utilities/date";
import { ColumnType, ScheduleDetailDtoInputType } from "types/plan";
import { PlaceApiType } from "types/place";
import { metros } from "data/metros";
import { tests } from "./data/plan";

const Plan = () => {
  const { hash, pathname } = useLocation();

  const encodedMetroName = pathname.split("/")[2];
  const discodedMetroName = decodeURIComponent(encodedMetroName);

  const metroId =
    metros.find((metro) => metro.name === discodedMetroName)?.areaCode || "";

  const [selectedPlaces, setSelectedPlaces] = useState<PlaceApiType[]>([
    ...tests,
  ]);
  const [dates, setDates] = useState<Date[]>([]);
  const [columns, setColumns] = useState<{
    [key: string]: ColumnType[];
  }>({});

  useEffect(() => {
    dates.forEach((date) => {
      columns[convertDateTypeToDate2(date)] = [];
    });
  }, [dates]);

  return (
    <div className="plan">
      {!hash || hash === "#calendar" ? (
        <PlanCalendar dates={dates} setDates={setDates} />
      ) : (
        hash === "#place" && (
          <PlanPlaces
            metroId={metroId}
            dates={dates}
            selectedPlaces={selectedPlaces}
            setSelectedPlaces={setSelectedPlaces}
            columns={columns}
            setColumns={setColumns}
          />
        )
      )}
    </div>
  );
};

export default Plan;
