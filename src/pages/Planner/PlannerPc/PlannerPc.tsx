import "./plannerPc.css";
import { PlannerPlacesProps } from "../PlannerPlace/PlannerPlaces";

const PlannerPc = ({ metroId, dates, setDates }: PlannerPlacesProps) => {
  return (
    <div className="planner-pc">
      <section className="planner-pc-choice">선택</section>
      <section className="planner-pc-map">맵</section>
    </div>
  );
};

export default PlannerPc;
