import { InfoType } from "pages/Planner/PlannerPc/PlannerPc";
import { ScheduleMobileProps } from "../Mobile/ScheduleMobile";
import "./schedulePc.css";
import MapClusterPc from "pages/Planner/PlannerPc/PlannerMap/MapClusterPc";
import { useState } from "react";
import { convertDateTypeToDate2 } from "utilities/date";
import PlannerPcStages from "pages/Planner/PlannerPc/PlannerPcStages/PlannerPcStages";
import SchedulePcStages from "./SchedulePcStages/SchedulePcStages";

export interface SchedulePcProps extends ScheduleMobileProps {
  allInfos: {
    [key: string]: (InfoType | undefined)[];
  };
}

const SchedulePc = ({
  title,
  setTitle,
  metroId,
  dates,
  setDates,
  columns,
  setColumns,
  registerDate,
  schedule,
  scheduleDetails,
  allInfos,
}: SchedulePcProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const column = columns[convertDateTypeToDate2(selectedDate)] || [];
  // 이동거리, 시간 정보
  const [infos, setInfos] = useState<(InfoType | undefined)[]>([]);

  return (
    <div className="schedule-pc">
      <SchedulePcStages
        metroId={metroId}
        setSelectedDate={setSelectedDate}
        dates={dates}
        setDates={setDates}
        columns={columns}
        setColumns={setColumns}
        date={selectedDate}
        setDate={setSelectedDate}
        infos={infos}
        allInfos={allInfos}
        title={title}
        setTitle={setTitle}
        schedule={schedule}
        scheduleDetails={scheduleDetails}
      />
      <MapClusterPc
        key={`mapCluster${selectedDate.toDateString()}`}
        metroId={metroId}
        column={column}
        date={selectedDate}
        infos={infos}
        setInfos={setInfos}
      />
    </div>
  );
};

export default SchedulePc;
