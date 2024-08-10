import "./plannerDateAccordian.css";
import { IoIosArrowDropup } from "react-icons/io";
import { ColumnType } from "types/plan";
import { convertDateTypeToDate2 } from "utilities/date";
import PlannerDateCard from "../PlannerCards/PlannerDateCard";
import { useState } from "react";
export interface PlannerDateAccordianProps {
  metroId: string;
  openAccordian: string;
  handleOpenAccordian: (value: string) => void;
  date: Date;
  columns: { [key: string]: ColumnType[] };
  setColumns: (value: { [key: string]: ColumnType[] }) => void;
  dates: Date[];
}

const PlannerDateAccordian = ({
  metroId,
  openAccordian,
  handleOpenAccordian,
  date,
  dates,
  columns,
  setColumns,
}: PlannerDateAccordianProps) => {
  const column = columns[convertDateTypeToDate2(date)] || [];

  // 이동 효과 관련
  const [moveClassGroup, setMoveClassGroup] = useState<string[]>([]);
  const [moveOrderGroup, setMoveOrderGroup] = useState<number[]>([]);

  const countOfPlaces = column.filter(
    (item) => item.place.contenttypeid !== "32"
  ).length;
  const countOfAccomm = column.filter(
    (item) => item.place.contenttypeid === "32"
  ).length;

  return (
    <section
      className={`planner-places-accordian-date${
        openAccordian === convertDateTypeToDate2(date)
          ? " active"
          : countOfPlaces > 0 && countOfAccomm > 0
          ? " completed"
          : ""
      }`}
      onClick={
        (column && column.length === 0) || !column
          ? undefined
          : () => handleOpenAccordian(convertDateTypeToDate2(date))
      }
    >
      <div className="planner-places-accordian-date-title">
        <p className="planner-places-accordian-date-title-container">
          <span className="planner-places-accordian-date-title-name">
            {convertDateTypeToDate2(date)}
          </span>
          <span className="planner-places-accordian-date-title-info">
            ( 여행지 :{" "}
            {column.filter((item) => item.place.contenttypeid !== "32").length}{" "}
            숙소 :{" "}
            {column.filter((item) => item.place.contenttypeid === "32").length}{" "}
            )
          </span>
        </p>
        <p
          className={`planner-places-accordian-date-title-icon${
            openAccordian === convertDateTypeToDate2(date) ? " active" : ""
          }`}
        >
          <IoIosArrowDropup />
        </p>
      </div>
      <ul
        className={`planner-places-accordian-date-container${
          openAccordian === convertDateTypeToDate2(date) ? " active" : ""
        }`}
      >
        {column &&
          column.map((item, index) => (
            <PlannerDateCard
              key={item.place.contentid}
              column={column}
              order={index}
              date={date}
              dates={dates}
              detail={item}
              metroId={metroId}
              columns={columns}
              setColumns={setColumns}
              moveClassGroup={moveClassGroup}
              setMoveClassGroup={setMoveClassGroup}
              moveOrderGroup={moveOrderGroup}
              setMoveOrderGroup={setMoveOrderGroup}
            />
          ))}
      </ul>
    </section>
  );
};

export default PlannerDateAccordian;
