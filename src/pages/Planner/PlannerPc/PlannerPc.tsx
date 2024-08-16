import "./plannerPc.css";
import { PlannerPlacesProps } from "../PlannerPlace/PlannerPlaces";
import { useState } from "react";
import { ColumnType } from "types/plan";
import { convertDateTypeToDate2 } from "utilities/date";
import MapClusterPc from "./PlannerMap/MapClusterPc";
import PlannerPcStages from "./PlannerPcStages/PlannerPcStages";

const PlannerPc = ({ metroId, dates, setDates }: PlannerPlacesProps) => {
  const [date, setDate] = useState<Date>(new Date());
  // 이동거리, 시간 정보
  const [infos, setInfos] = useState<
    ({ distance: number; duration: number } | undefined)[]
  >([]);
  const [columns, setColumns] = useState<{ [key: string]: ColumnType[] }>({});

  const column = columns[convertDateTypeToDate2(date)] || [];

  return (
    <div className="planner-pc">
      <PlannerPcStages
        metroId={metroId}
        setSelectedDate={setDate}
        dates={dates}
        setDates={setDates}
        columns={columns}
        setColumns={setColumns}
        date={date}
        setDate={setDate}
      />

      <section className="planner-pc-map">
        <MapClusterPc
          key={`mapCluster${date.toDateString()}`}
          metroId={metroId}
          column={column}
          date={date}
          infos={infos}
          setInfos={setInfos}
        />
      </section>
    </div>
  );
};

export default PlannerPc;
