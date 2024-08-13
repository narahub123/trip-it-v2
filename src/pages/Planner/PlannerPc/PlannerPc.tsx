import "./plannerPc.css";
import { PlannerPlacesProps } from "../PlannerPlace/PlannerPlaces";

import PlannerPcStages from "./PlannerPcStages/PlannerPcStages";

const PlannerPc = ({ metroId, dates, setDates }: PlannerPlacesProps) => {
  return (
    <div className="planner-pc">
      <PlannerPcStages metroId={metroId} dates={dates} setDates={setDates} />

      <section className="planner-pc-map">맵</section>
    </div>
  );
};

export default PlannerPc;
