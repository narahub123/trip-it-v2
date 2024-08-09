import "./planAccordian.css";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoIosArrowDropup } from "react-icons/io";
import { convertDateTypeToDate2 } from "utilities/date";
import PlanColumnCard from "../PlanColumnCard";
import { ColumnType } from "types/plan";
import { PlaceApiType } from "types/place";

export interface PlanAccordianProps {
  metroId: string;
  date: Date;
  dates: Date[];
  columns: { [key: string]: ColumnType[] };
  setColumns: (value: { [key: string]: ColumnType[] }) => void;
  openAccordian: string;
  setOpenAccordian: (value: string) => void;
  handleOpen: (value: string) => void;
  selectedPlaces: PlaceApiType[];
  setSelectedPlaces: (value: PlaceApiType[]) => void;
  valid: { [key: string]: boolean };
  setValid: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
}

const PlanAccordian = ({
  metroId,
  date,
  dates,
  columns,
  setColumns,
  openAccordian,
  setOpenAccordian,
  handleOpen,
  valid,
  setValid,
}: PlanAccordianProps) => {
  const [numOfPlace, setNumOfPlace] = useState(0);
  const [numOfAccomm, setNumOfAccomm] = useState(0);

  useEffect(() => {
    const dateKey = convertDateTypeToDate2(date);
    const contentTypeIds = columns[dateKey].map((p) => p.place.contenttypeid);

    const countPlaces = contentTypeIds.filter((type) => type !== "32").length;
    const countAccomms = contentTypeIds.filter((type) => type === "32").length;

    setNumOfPlace(countPlaces);
    setNumOfAccomm(countAccomms);

    console.log(date, countPlaces > 0 && countAccomms > 0);

    setValid((prevValid: { [key: string]: boolean }) => ({
      ...prevValid,
      [convertDateTypeToDate2(date)]: countPlaces > 0 && countAccomms > 0,
    }));
  }, [date, columns, setValid]);

  return (
    <section
      className={`plan-places-main ${
        numOfPlace > 0 && numOfAccomm > 0 ? "completed" : ""
      }`}
      key={convertDateTypeToDate2(date)}
    >
      <div
        className="plan-places-main-title"
        onClick={
          columns[convertDateTypeToDate2(date)].length === 0
            ? undefined
            : () => handleOpen(convertDateTypeToDate2(date))
        }
      >
        <p>
          {convertDateTypeToDate2(date)}{" "}
          {`장소 : ${numOfPlace} 숙소 : ${numOfAccomm}`}
        </p>

        <span
          className={`plan-places-main-title-icon ${
            openAccordian === convertDateTypeToDate2(date) ? "active" : ""
          }`}
        >
          <IoIosArrowDropup />
        </span>
      </div>

      <ul
        className={`plan-places-main-container ${
          openAccordian === convertDateTypeToDate2(date) ? "active" : ""
        }`}
      >
        {columns[convertDateTypeToDate2(date)].map((detail, index) => (
          <PlanColumnCard
            order={index}
            metroId={metroId}
            date={date}
            dates={dates}
            detail={detail}
            columns={columns}
            setColumns={setColumns}
            setOpenAccordian={setOpenAccordian}
            key={detail.place.contentid}
          />
        ))}
        <div className="plan-places-main-map">map</div>
      </ul>
    </section>
  );
};

export default PlanAccordian;
