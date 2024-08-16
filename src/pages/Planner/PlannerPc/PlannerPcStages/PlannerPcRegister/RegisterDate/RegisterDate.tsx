import "./registerDate.css";
import { convertDateTypeToDate1, convertDateTypeToDate2 } from "utilities/date";
import PlannerPcRegisterCard from "../components/PlannerPcRegisterCard";
import { ColumnType } from "types/plan";
import { useState } from "react";

export interface PlannerPcRegisterCardProps {
  index: number;
  curDate: Date;
  selectedDate: Date;
  setDate: (value: Date) => void;
  dates: Date[];
  metroId: string;
  columns: { [key: string]: ColumnType[] };
  setColumns: (value: { [key: string]: ColumnType[] }) => void;
  column: ColumnType[];
  dragOver: (e: React.DragEvent<HTMLLIElement>) => void;
  dragStart: (e: React.DragEvent<HTMLLIElement>) => void;
  dragEnd: (e: React.DragEvent<HTMLLIElement>) => void;
  drop: (e: React.DragEvent<HTMLLIElement>) => void;
  droppable: string[];
  handleDateDragStart: (e: React.DragEvent<HTMLElement>) => void;
  handleDateDragOver: (e: React.DragEvent<HTMLElement>) => void;
  handleDateDragEnd: (e: React.DragEvent<HTMLElement>) => void;
  handleDateDrop: (e: React.DragEvent<HTMLElement>) => void;
  setOpenMenu: (value: boolean) => void;
}
const RegisterDate = ({
  index,
  setOpenMenu,
  curDate,
  selectedDate,
  setDate,
  dates,
  metroId,
  column,
  columns,
  setColumns,
  dragStart,
  dragOver,
  dragEnd,
  drop,
  droppable,
  handleDateDragStart,
  handleDateDragOver,
  handleDateDragEnd,
  handleDateDrop,
}: PlannerPcRegisterCardProps) => {
  // 이동 효과 관련
  const [moveClassGroup, setMoveClassGroup] = useState<string[]>([]);
  const [moveOrderGroup, setMoveOrderGroup] = useState<number[]>([]);

  const selected =
    convertDateTypeToDate1(selectedDate) === convertDateTypeToDate1(curDate);

  const handleOpenMap = (date: Date) => {
    setDate(curDate);
    setOpenMenu(false);
  };
  return (
    <section
      className={`planner-pc-register-plan-date-item${
        selected ? " selected" : ""
      }`}
      draggable={column.length !== 0}
      data-row={convertDateTypeToDate2(curDate)}
      onDragStart={(e) => handleDateDragStart(e)}
      onDragEnd={(e) => handleDateDragEnd(e)}
      onDragOver={(e) => handleDateDragOver(e)}
      onDrop={(e) => handleDateDrop(e)}
    >
      <div
        className="planner-pc-register-plan-date-item-title"
        onClick={() => setDate(curDate)}
      >
        <p className="planner-pc-register-plan-date-item-title-name">{`Day${
          index + 1
        } : ${convertDateTypeToDate1(curDate)}`}</p>
        <p
          className="planner-pc-register-plan-date-item-title-map"
          onClick={() => handleOpenMap(curDate)}
        >
          지도 보기
        </p>
      </div>
      <ul className="planner-pc-register-plan-date-item-container">
        {column.length !== 0 && (
          <li
            className={`planner-pc-register-card-indicator${
              droppable[0] === convertDateTypeToDate2(curDate) &&
              droppable[1] === "0"
                ? " droppable"
                : ""
            }`}
            data-row={convertDateTypeToDate2(curDate)}
            data-col={0}
            // draggable
            onDragOver={(e) => dragOver(e)}
            onDragStart={(e) => dragStart(e)}
            onDragEnd={(e) => dragEnd(e)}
            onDrop={(e) => drop(e)}
          >
            <p />
          </li>
        )}
        {column.map((item, index) => (
          <PlannerPcRegisterCard
            key={`${item.place.contentid}_${index}`}
            column={column}
            order={index}
            date={curDate}
            dates={dates}
            detail={item}
            metroId={metroId}
            columns={columns}
            setColumns={setColumns}
            moveClassGroup={moveClassGroup}
            setMoveClassGroup={setMoveClassGroup}
            moveOrderGroup={moveOrderGroup}
            setMoveOrderGroup={setMoveOrderGroup}
            index={index}
            dragStart={dragStart}
            dragOver={dragOver}
            dragEnd={dragEnd}
            drop={drop}
            droppable={droppable}
          />
        ))}
        {column.length === 0 && (
          <li
            className="planner-pc-register-card-cover"
            data-row={convertDateTypeToDate2(curDate)}
            data-col={0}
            // draggable
            onDragOver={(e) => dragOver(e)}
            onDragStart={(e) => dragStart(e)}
            onDragEnd={(e) => dragEnd(e)}
            onDrop={(e) => drop(e)}
          >
            <p className="planner-pc-register-card-noplace">
              장소를 선택해주세요
            </p>
          </li>
        )}
      </ul>
    </section>
  );
};

export default RegisterDate;
