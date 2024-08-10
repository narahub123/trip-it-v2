import { getMetroName } from "utilities/metros";
import "./plannerInfoAccordian.css";
import { IoIosArrowDropup } from "react-icons/io";
import { convertDateTypeToDate2 } from "utilities/date";
export interface PlannerInfoAccordianProps {
  openAccordian: string;
  handleOpenAccordian: (value: string) => void;
  metroId: string;
  dates: Date[];
}

const PlannerInfoAccordian = ({
  openAccordian,
  handleOpenAccordian,
  metroId,
  dates,
}: PlannerInfoAccordianProps) => {
  const startDate =
    // convertDateTypeToDate2(dates[0]) ||
    dates[0];
  const endDate =
    // convertDateTypeToDate2(dates[dates.length - 1]) ||
    dates[dates.length - 1];
  return (
    <section
      className={`planner-places-accordian-info${
        openAccordian === "info" ? " active" : ""
      }`}
      onClick={() => handleOpenAccordian("info")}
    >
      <div className="planner-places-accordian-info-title">
        <p className="planner-places-accordian-info-title-name">일정 정보</p>
        <p
          className={`planner-places-accordian-info-title-icon${
            openAccordian === "info" ? " active" : ""
          }`}
        >
          <IoIosArrowDropup />
        </p>
      </div>
      <ul
        className={`planner-places-accordian-info-container${
          openAccordian === "info" ? " active" : ""
        }`}
      >
        <li className="planner-places-accordian-info-item">
          <span>이름</span>
          <span onClick={(e) => e.stopPropagation()}>
            <input type="text" />
          </span>
        </li>
        <li className="planner-places-accordian-info-item">
          <span>지역</span>
          <span>{getMetroName(metroId)}</span>
        </li>
        <li className="planner-places-accordian-info-item">
          <span>기간</span>
          <span>
            {!startDate || !endDate ? "알수없음" : `${startDate}~${endDate}`}
          </span>
        </li>
      </ul>
    </section>
  );
};

export default PlannerInfoAccordian;
