import { convertDateTypeToDate2 } from "utilities/date";
import "./plannerPlaces.css";
import { useEffect, useState } from "react";
import PlannerInfoAccordian from "./PlannerAccordians/PlannerInfoAccordian";
import PlannerAPIAccordian from "./PlannerAccordians/PlannerAPIAccordian";
import { plannerAPIAccordianArr } from "../data/plannerPlace";
import PlannerDateAccordian from "./PlannerAccordians/PlannerDateAccordian";
import { ColumnType } from "types/plan";
import { useNavigate } from "react-router-dom";
export interface PlannerPlacesProps {
  metroId: string;
  dates: Date[];
}
const PlannerPlaces = ({ metroId, dates }: PlannerPlacesProps) => {
  const navigate = useNavigate();
  const [openAccordian, setOpenAccordian] = useState("");
  const [columns, setColumns] = useState<{ [key: string]: ColumnType[] }>({});
  const [title, setTitle] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    dates.forEach((date) => {
      columns[convertDateTypeToDate2(date)] = [];
    });
  }, [dates]);

  useEffect(() => {
    // 각 컬럼에 적어도 숙소 한 곳, 관광지 한 곳 이상이 있어야 함
    dates.forEach((date) => {
      const column = columns[convertDateTypeToDate2(date)];

      // 관광지 개수
      const countOfPlaces = column.filter(
        (item) => item.place.contenttypeid !== "32"
      ).length;
      // 숙소 개수
      const countOfAccomm = column.filter(
        (item) => item.place.contenttypeid === "32"
      ).length;

      if (countOfPlaces < 1 || countOfAccomm < 1) {
        return setValid(false);
      } else {
        // 모든 컬럼에 결격 사유가 없는 경우
        setValid(true);
      }
    });
  }, [columns]);

  const handleOpenAccordian = (accordianName: string) => {
    if (accordianName === openAccordian) {
      return setOpenAccordian("");
    } else {
      setOpenAccordian(accordianName);
    }
  };

  console.log(columns);
  console.log(valid);

  return (
    <div className="planner-places">
      <section className="planner-places-title">
        <h3>장소 선택</h3>
      </section>
      <PlannerInfoAccordian
        title={title}
        setTitle={setTitle}
        openAccordian={openAccordian}
        handleOpenAccordian={handleOpenAccordian}
        metroId={metroId}
        dates={dates}
      />

      {plannerAPIAccordianArr.map((apiInfo) => (
        <PlannerAPIAccordian
          key={apiInfo.key}
          dates={dates}
          metroId={metroId}
          openAccordian={openAccordian}
          handleOpenAccordian={handleOpenAccordian}
          apiInfo={apiInfo}
          columns={columns}
          setColumns={setColumns}
        />
      ))}
      {dates.map((date) => (
        <PlannerDateAccordian
          metroId={metroId}
          openAccordian={openAccordian}
          handleOpenAccordian={handleOpenAccordian}
          date={date}
          dates={dates}
          key={convertDateTypeToDate2(date)}
          columns={columns}
          setColumns={setColumns}
        />
      ))}
      <section className="planner-places-btns">
        <button
          className={`planner-places-btns-btn backward`}
          onClick={() => navigate("#calendar")}
        >
          이전
        </button>
        <button
          className={`planner-places-btns-btn${
            title && valid ? " register" : ""
          }`}
        >
          등록
        </button>
      </section>
    </div>
  );
};

export default PlannerPlaces;
