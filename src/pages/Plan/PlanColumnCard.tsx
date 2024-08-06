import "./planColumnCard.css";

import { metros } from "data/metros";
import { hourArr, minuteArr } from "data/plan";
import React, { useEffect, useState } from "react";
import { LuChevronUp, LuMoreHorizontal } from "react-icons/lu";
import { PlaceApiType } from "types/place";
import Dropdown from "./components/Dropdown";
import { scheduleDetailDtoType } from "types/plan";
import { convertDateTypeToDate1, convertDateTypeToDate2 } from "utilities/date";
import { fetchPlaceAPI } from "apis/place";

export interface PlanColumnCardProps {
  metroId: string;
  date: Date;
  dates: Date[];
  detail: scheduleDetailDtoType;
  columns: { [key: string]: scheduleDetailDtoType[] };
  setColumns: (value: { [key: string]: scheduleDetailDtoType[] }) => void;
  setOpenAccordin: (value: string) => void;
}

const PlanColumnCard = ({
  metroId,
  date,
  dates,
  detail,
  columns,
  setColumns,
  setOpenAccordin,
}: PlanColumnCardProps) => {
  const [place, setPlace] = useState<PlaceApiType>();
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

  // 외부 api에서 장소 정보 받아오기
  useEffect(() => {
    fetchPlaceAPI(detail.contentId).then((res) => {
      if (!res) return;

      setPlace(res.data[0]);
    });
  }, []);

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
      (item) => item.contentId === detail.contentId
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
      (place) => place.contentId !== contentId
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
      (item) => item.contentId !== detail.contentId
    );
    const newColumns = {
      ...columns,
      [convertDateTypeToDate2(date)]: newColumn,
    };

    console.log(newColumns);

    const index = dates.findIndex((d) => d === newDate);
    console.log(index);

    const newDetail = {
      contentId: detail.contentId,
      scheduleOrder: (index + 1).toString(),
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
    setOpenAccordin(convertDateTypeToDate2(newDate));
  };
  return (
    <li className="plan-submit-column-card">
      <div className="plan-submit-column-card-upper">
        <span
          className="plan-submit-column-card-info"
          onClick={(e) => handlePlace(e)}
        >
          <span className="plan-submit-column-card-info-photo">
            <img src={place?.firstimage || defaultImage} alt="" />
          </span>
          <span className="plan-submit-column-card-info-detail">
            <div className="plan-submit-column-card-info-detail-title">
              {place?.title}{" "}
              <span className="plan-submit-column-card-info-detail-title-more">
                <LuChevronUp />
              </span>
            </div>
            <div className="plan-submit-column-card-info-detail-hour">
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
        <span className="plan-submit-column-card-btn">
          <button
            className="plan-submit-column-card-btn-more"
            onClick={() => setOpen(!open)}
          >
            <LuMoreHorizontal />
          </button>
          <ul
            className={`plan-submit-column-card-btn-container ${
              open ? "active" : ""
            }`}
          >
            <li
              className="plan-submit-column-card-btn-item"
              onClick={(e) => handleDeselect(e, place?.contentid)}
            >
              삭제
            </li>
            {dates.map((d, index) => {
              if (d === date) return;
              return (
                <li
                  className="plan-submit-column-card-btn-item"
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
        className={`plan-submit-column-card-lower${
          openDepict ? "-active" : ""
        }`}
      >
        <div className="plan-submit-column-card-depict">
          <div className="plan-submit-column-card-depict-title">설명</div>
          <div className="plan-submit-column-card-depict-main">
            {place?.overview}
          </div>
        </div>
        <div className="plan-submit-column-card-map">map</div>
      </div>
    </li>
  );
};

export default PlanColumnCard;
