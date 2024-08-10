import { convertDateTypeToDate2 } from "utilities/date";
import "./plannerPlaces.css";
import { IoIosArrowDropup } from "react-icons/io";
import { useEffect, useState } from "react";
import PlannerInfoAccordian from "./PlannerAccordians/PlannerInfoAccordian";
import PlannerAPIAccordian from "./PlannerAccordians/PlannerAPIAccordian";
import { plannerAPIAccordianArr } from "../data/plannerPlace";
import PlannerDateAccordian from "./PlannerAccordians/PlannerDateAccordian";
import { ColumnType } from "types/plan";
export interface PlannerPlacesProps {
  metroId: string;
  dates: Date[];
}
const PlannerPlaces = ({ metroId, dates }: PlannerPlacesProps) => {
  const [openAccordian, setOpenAccordian] = useState("");
  const [columns, setColumns] = useState<{ [key: string]: ColumnType[] }>({});

  useEffect(() => {
    dates.forEach((date) => {
      columns[convertDateTypeToDate2(date)] = [];
    });
  }, [dates]);

  const handleOpenAccordian = (accordianName: string) => {
    if (accordianName === openAccordian) {
      return setOpenAccordian("");
    } else {
      setOpenAccordian(accordianName);
    }
  };

  console.log(columns);

  return (
    <div className="planner-places">
      <section className="planner-places-title">
        <h3>장소 선택</h3>
      </section>
      <PlannerInfoAccordian
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
    </div>
  );
};

export default PlannerPlaces;
