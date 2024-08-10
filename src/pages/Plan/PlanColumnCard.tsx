import "./planColumnCard.css";

import { metros } from "data/metros";
import { hourArr, minuteArr } from "data/plan";
import React, { useEffect, useState } from "react";
import { LuChevronDown, LuChevronUp, LuMoreHorizontal } from "react-icons/lu";
import Dropdown from "./components/Dropdown";
import { ColumnType } from "types/plan";
import { convertDateTypeToDate1, convertDateTypeToDate2 } from "utilities/date";

export interface PlanColumnCardProps {
  order: number;
  metroId: string;
  date: Date;
  dates: Date[];
  detail: ColumnType;
  columns: { [key: string]: ColumnType[] };
  setColumns: (value: { [key: string]: ColumnType[] }) => void;
  setOpenAccordian: (value: string) => void;
}

const PlanColumnCard = ({
  order,
  metroId,
  date,
  dates,
  detail,
  columns,
  setColumns,
  setOpenAccordian,
}: PlanColumnCardProps) => {
  const [open, setOpen] = useState(false);
  const [openDepict, setOpenDepict] = useState(false);

  const startTime = detail.startTime.split(":");
  const endTime = detail.endTime.split(":");

  const [startHour, setStartHour] = useState(startTime[0]);
  const [startMinute, setStartMinute] = useState(startTime[1]);
  const [endHour, setEndHour] = useState(endTime[0]);
  const [endMinute, setEndMinute] = useState(endTime[1]);

  const defaultImage = metros.find(
    (metro) => metro.areaCode === metroId
  )?.imgUrl;

  const place = detail.place;
  // 시간 변경시 자동 업데이트 되게 하기
  useEffect(() => {
    const updatedColumns = { ...columns };

    const columnKey = convertDateTypeToDate2(date);
    const updatedDetail = {
      ...detail,
      startTime: `${startHour}:${startMinute}`,
      endTime: `${endHour}:${endMinute}`,
    };

    const index = updatedColumns[columnKey].findIndex(
      (item) => item.place.contentid === detail.place.contentid
    );

    if (index !== -1) {
      updatedColumns[columnKey][index] = updatedDetail;
    } else {
      updatedColumns[columnKey].push(updatedDetail);
    }

    setColumns(updatedColumns);
  }, [startHour, startMinute, endHour, endMinute]);

  // 상세 설명 열고 닫기
  const handlePlace = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    setOpenDepict(!openDepict);
  };

  // 선택 삭제하기
  const handleDeselect = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    contentId?: string
  ) => {
    e.stopPropagation();

    const value = columns[convertDateTypeToDate2(date)];

    const newSelections = value.filter(
      (place) => place.place.contentid !== contentId
    );

    setColumns({
      ...columns,
      [convertDateTypeToDate2(date)]: newSelections,
    });
  };

  // 다른 날짜로 이동하기
  const handleAdd = (newDate: Date, order: number) => {
    // 기존의 데이터를 지움
    const value = columns[convertDateTypeToDate2(date)];

    const newColumn = value.filter(
      (item) => item.place.contentid !== detail.place.contentid
    );
    const newColumns = {
      ...columns,
      [convertDateTypeToDate2(date)]: newColumn,
    };

    console.log(newColumns);

    const index = dates.findIndex((d) => d === newDate);
    console.log(index);

    const newDetail = {
      place,
      scheduleOrder: index,
      startTime: "06:00",
      endTime: "07:00",
    };

    const newValue = newColumns[convertDateTypeToDate2(newDate)];
    const updatedColumns = {
      ...newColumns,
      [convertDateTypeToDate2(newDate)]: [...newValue, newDetail],
    };

    console.log(updatedColumns);

    setColumns(updatedColumns);
    setOpen(false);
    setOpenAccordian(convertDateTypeToDate2(newDate));
  };

  console.log(detail);

  return (
    <li className={`plan-places-column-card`}>
      <div className="plan-places-column-card-upper">
        <span className="plan-places-column-card-move">
          {order !== 0 && (
            <div className="plan-places-column-card-move-up">
              <LuChevronUp />
            </div>
          )}
          <div className="plan-places-column-card-move-down">
            <LuChevronDown />
          </div>
        </span>
        <span
          className="plan-places-column-card-info"
          onClick={(e) => handlePlace(e)}
        >
          <span className="plan-places-column-card-info-photo">
            <img src={place?.firstimage || defaultImage} alt="" />
          </span>
          <span className="plan-places-column-card-info-detail">
            <div className="plan-places-column-card-info-detail-title">
              <span
                className={`plan-places-column-card-info-detail-title-type ${
                  place?.contenttypeid === "12"
                    ? "tour"
                    : place?.contenttypeid === "14"
                    ? "culture"
                    : place?.contenttypeid === "39"
                    ? "food"
                    : place?.contenttypeid === "32"
                    ? "accomm"
                    : ""
                }`}
              >
                {place &&
                  (place.contenttypeid === "12"
                    ? "관광"
                    : place.contenttypeid === "14"
                    ? "문화"
                    : place.contenttypeid === "39"
                    ? "식당"
                    : place.contenttypeid === "32"
                    ? "숙소"
                    : "기타")}
              </span>
              {place?.title}{" "}
              <span className="plan-places-column-card-info-detail-title-more">
                <LuChevronUp />
              </span>
            </div>
            <div className="plan-places-column-card-info-detail-hour">
              <Dropdown
                value={startHour}
                array={hourArr}
                setFunc={setStartHour}
              />
              :
              <Dropdown
                value={startMinute}
                array={minuteArr}
                setFunc={setStartMinute}
              />
              ~
              <Dropdown value={endHour} array={hourArr} setFunc={setEndHour} />:
              <Dropdown
                value={endMinute}
                array={minuteArr}
                setFunc={setEndMinute}
              />
            </div>
          </span>
        </span>
        <span className="plan-places-column-card-btn">
          <button
            className="plan-places-column-card-btn-more"
            onClick={() => setOpen(!open)}
          >
            <LuMoreHorizontal />
          </button>
          <ul
            className={`plan-places-column-card-btn-container ${
              open ? "active" : ""
            }`}
          >
            <li
              className="plan-places-column-card-btn-item"
              onClick={(e) => handleDeselect(e, place?.contentid)}
            >
              삭제
            </li>
            {dates.map((d, index) => {
              if (d === date) return;
              return (
                <li
                  className="plan-places-column-card-btn-item"
                  onClick={() => handleAdd(d, index + 1)}
                  key={convertDateTypeToDate1(d)}
                >
                  {convertDateTypeToDate1(d)}
                </li>
              );
            })}
          </ul>
        </span>
      </div>
      <div
        className={`plan-places-column-card-lower${
          openDepict ? "-active" : ""
        }`}
      >
        <div className="plan-places-column-card-depict">
          <div className="plan-places-column-card-depict-title">설명</div>
          <div className="plan-places-column-card-depict-main">
            {place?.overview}
          </div>
        </div>
        <div className="plan-places-column-card-map">map</div>
      </div>
    </li>
  );
};

export default PlanColumnCard;
