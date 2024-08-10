import { getMetroName } from "utilities/metros";
import "./plannerInfoAccordian.css";
import { IoIosArrowDropup } from "react-icons/io";
import { convertDateTypeToDate2 } from "utilities/date";
import { debounce } from "utilities/debounce";
export interface PlannerInfoAccordianProps {
  openAccordian: string;
  handleOpenAccordian: (value: string) => void;
  metroId: string;
  dates: Date[];
  title: string;
  setTitle: (value: string) => void;
  openCalendar?: boolean;
  setOpenCalendar?: (value: boolean) => void;
}

const PlannerInfoAccordian = ({
  openAccordian,
  handleOpenAccordian,
  metroId,
  dates,
  title,
  setTitle,
  openCalendar,
  setOpenCalendar,
}: PlannerInfoAccordianProps) => {
  const startDate =
    convertDateTypeToDate2(dates[0]) || convertDateTypeToDate2(new Date());

  const endDate =
    convertDateTypeToDate2(dates[dates.length - 1]) ||
    convertDateTypeToDate2(new Date());

  // 타이틀 저장
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;

    setTitle(value);
  };

  // 렌더링을 줄이기 위한 debounce
  const debouncedTitle = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  }, 500);

  // 캘린더를 아코디언 여닫이 함수
  const handleOpenCalendar = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!setOpenCalendar) return;
    setOpenCalendar(!openCalendar);
  };
  return (
    <section
      className={`planner-places-accordian-info${
        openAccordian === "info" ? " active" : title ? " completed" : ""
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
            <input type="text" defaultValue={title} onChange={debouncedTitle} />
          </span>
        </li>
        <li className="planner-places-accordian-info-item">
          <span>지역</span>
          <span>{getMetroName(metroId)}</span>
        </li>
        <li className="planner-places-accordian-info-item">
          <span>기간</span>
          <span onClick={(e) => handleOpenCalendar(e)}>
            {!startDate || !endDate ? "알수없음" : `${startDate}~${endDate}`}
          </span>
        </li>
      </ul>
    </section>
  );
};

export default PlannerInfoAccordian;
