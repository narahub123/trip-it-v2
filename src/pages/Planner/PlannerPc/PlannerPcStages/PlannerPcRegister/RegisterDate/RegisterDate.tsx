import "./registerDate.css";
import { convertDateTypeToDate1, convertDateTypeToDate2 } from "utilities/date";
import PlannerPcRegisterCard from "../components/PlannerPcRegisterCard";
import { ColumnType } from "types/plan";
import React, { useEffect, useState } from "react";

import { LuArrowDown } from "react-icons/lu";
import { calcMinutes } from "utilities/map";

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
  setPlanValid: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  infos: (
    | { distance: number | string; duration: number | string }
    | undefined
  )[];
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
  setPlanValid,
  infos,
}: PlannerPcRegisterCardProps) => {
  // 이동 효과 관련
  const [moveClassGroup, setMoveClassGroup] = useState<string[]>([]);
  const [moveOrderGroup, setMoveOrderGroup] = useState<number[]>([]);
  const [valid, setValid] = useState(true);
  const [warning, setWarning] = useState("");
  const selected =
    convertDateTypeToDate1(selectedDate) === convertDateTypeToDate1(curDate);

  useEffect(() => {
    const countOfTours = column.filter(
      (item) => item.place.contenttypeid !== "32"
    ).length;

    const countOfAccommos = column.filter(
      (item) => item.place.contenttypeid === "32"
    ).length;

    if (countOfTours < 1 && countOfAccommos < 1) {
      setValid(false);
      setPlanValid((prev) => ({
        ...prev,
        [convertDateTypeToDate2(curDate)]: false,
      }));
      setWarning("관광지와 숙소를 선택해주세요.");
      return;
    } else if (countOfTours < 1) {
      setValid(false);
      setPlanValid((prev) => ({
        ...prev,
        [convertDateTypeToDate2(curDate)]: false,
      }));
      setWarning("관광지를 선택해주세요.");
    } else if (countOfAccommos < 1) {
      setValid(false);
      setPlanValid((prev) => ({
        ...prev,
        [convertDateTypeToDate2(curDate)]: false,
      }));
      setWarning("숙소를 선택해주세요.");
    } else {
      setValid(true);
      setWarning("");
      setPlanValid((prev) => ({
        ...prev,
        [convertDateTypeToDate2(curDate)]: true,
      }));
    }
  }, [column]);

  const handleOpenMap = (date: Date) => {
    setDate(curDate);
    setOpenMenu(false);
  };
  return (
    <section
      className={`planner-pc-register-plan-date-item${
        selected ? " selected" : ""
      }${valid ? "" : " invalid"}`}
    >
      <div
        className="planner-pc-register-plan-date-item-title"
        onClick={() => setDate(curDate)}
        draggable={column.length !== 0}
        data-row={convertDateTypeToDate2(curDate)}
        onDragStart={(e) => handleDateDragStart(e)}
        onDragEnd={(e) => handleDateDragEnd(e)}
        onDragOver={(e) => handleDateDragOver(e)}
        onDrop={(e) => handleDateDrop(e)}
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
        {warning && (
          <li className="planner-pc-register-plan-date-item-warning">
            {warning}
          </li>
        )}
        {column.length === 0 && (
          <li
            className="planner-pc-register-card-cover"
            data-row={convertDateTypeToDate2(curDate)}
            data-col={0}
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
            onDragOver={(e) => dragOver(e)}
            onDragStart={(e) => dragStart(e)}
            onDragEnd={(e) => dragEnd(e)}
            onDrop={(e) => drop(e)}
          ></li>
        )}

        {column.map((item, index, arr) => (
          <>
            <PlannerPcRegisterCard
              key={`${item.place.contentid}_${index}`}
              column={column}
              order={index}
              curDate={curDate}
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
              infos={infos}
            />
            {/* <li className="planner-pc-register-plan-date-item-duration">
              {index !== arr.length - 1 && infos[index] ? (
                typeof infos[index]?.duration === "number" ? (
                  <span className="icon">
                    <LuArrowDown />
                  </span>
                ) : (
                  <p></p>
                )
              ) : (
                ""
              )}
              {index !== arr.length - 1 && infos[index]
                ? `${
                    typeof infos[index]?.duration === "number"
                      ? "이동시간 : " +
                        calcMinutes(infos[index]?.duration as number) +
                        "분"
                      : infos[index]?.duration
                  }`
                : ""}
            </li> */}
          </>
        ))}
      </ul>
    </section>
  );
};

export default RegisterDate;
