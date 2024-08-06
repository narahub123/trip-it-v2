import "./planSubmitSelectedPlaceCard.css";
import React, { useEffect, useState } from "react";
import { PlanSelectedPlaceCardProps } from "./PlanSelectedPlaceCard";
import { PlaceApiType } from "types/place";
import { metros } from "data/metros";
import { LuChevronUp, LuMoreHorizontal } from "react-icons/lu";
import { convertDateTypeToDate1, convertDateTypeToDate2 } from "utilities/date";
import { scheduleDetailDtoType } from "types/plan";
import { fetchPlaceAPI } from "apis/place";

export interface PlanSubmitSelectedPlaceCardProps
  extends PlanSelectedPlaceCardProps {
  dates: Date[];
  columns: { [key: string]: scheduleDetailDtoType[] };
  setColumns: (value: { [key: string]: scheduleDetailDtoType[] }) => void;
  setOpenAccordin: (value: string) => void;
}

const PlanSubmitSelectedPlaceCard = ({
  metroId,
  contentId,
  selectedPlaces,
  setSelectedPlaces,
  dates,
  columns,
  setColumns,
  setOpenAccordin,
}: PlanSubmitSelectedPlaceCardProps) => {
  const [loading, setLoading] = useState(false);
  const [openDepict, setOpenDepict] = useState(false);
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useState<PlaceApiType>();

  const defaultImage = metros.find(
    (metro) => metro.areaCode === metroId
  )?.imgUrl;

  useEffect(() => {
    setLoading(true);

    fetchPlaceAPI(contentId)
      .then((res) => {
        if (!res) return;
        console.log(res.data);

        setPlace(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [contentId]);

  // 장소 상세 설명 열기
  const handlePlace = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    setOpenDepict(!openDepict);
  };

  // 선택 삭제 하기
  const handleDeselect = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    contentId?: string
  ) => {
    e.stopPropagation();

    const newSelections = selectedPlaces.filter(
      (selectedPlace) => selectedPlace !== contentId
    );

    setSelectedPlaces(newSelections);
  };

  // 선택한 날짜를 특정 날짜로 이동 시키기
  const handleAdd = (date: Date, order: number) => {
    const newDetail = {
      contentId,
      scheduleOrder: order.toString(),
      startTime: "06:00",
      endTime: "07:00",
    };
    const newPlaces = selectedPlaces.filter((pl) => pl !== contentId);
    const value = columns[convertDateTypeToDate2(date)];
    const newColumns = {
      ...columns,
      [convertDateTypeToDate2(date)]: [...value, newDetail],
    };

    setSelectedPlaces(newPlaces);
    setColumns(newColumns);
    setOpen(false);
    if (selectedPlaces.length === 1)
      setOpenAccordin(convertDateTypeToDate2(date));
  };

  return (
    <li className="plan-submit-main-selectedcard">
      <div className="plan-submit-main-selectedcard-upper">
        <span
          className="plan-submit-main-selectedcard-info"
          onClick={(e) => handlePlace(e)}
        >
          <span className="plan-submit-main-selectedcard-info-photo">
            <img src={place?.firstimage || defaultImage} alt="" />
          </span>
          <span className="plan-submit-main-selectedcard-info-detail">
            <div className="plan-submit-main-selectedcard-info-detail-title">
              {place?.title}{" "}
              <span className="place-places-main-card-info-detail-title-more">
                <LuChevronUp />
              </span>
            </div>
            <div className="plan-submit-main-selectedcard-info-detail-addr">
              {place?.addr1}
            </div>
          </span>
        </span>
        <span className="plan-submit-main-selectedcard-btn">
          <button
            className="plan-submit-main-selectedcard-btn-more"
            onClick={() => setOpen(!open)}
          >
            <LuMoreHorizontal />
          </button>
          <ul
            className={`plan-submit-main-selectedcard-btn-container ${
              open ? "active" : ""
            }`}
          >
            <li
              className="plan-submit-main-selectedcard-btn-item"
              onClick={(e) => handleDeselect(e, place?.contentid)}
            >
              삭제
            </li>
            {dates.map((date, index) => (
              <li
                className="plan-submit-main-selectedcard-btn-item"
                onClick={() => handleAdd(date, index + 1)}
                key={convertDateTypeToDate1(date)}
              >
                {convertDateTypeToDate1(date)}
              </li>
            ))}
          </ul>
        </span>
      </div>
      <div
        className={`plan-submit-main-selectedcard-lower${
          openDepict ? "-active" : ""
        }`}
      >
        <div className="plan-submit-main-selectedcard-depict">
          <div className="plan-submit-main-selectedcard-depict-title">설명</div>
          {loading ? (
            "loading..."
          ) : (
            <div className="plan-submit-main-selectedcard-depict-main">
              {place?.overview}
            </div>
          )}
        </div>
        <div className="plan-submit-main-selectedcard-map">map</div>
      </div>
    </li>
  );
};

export default PlanSubmitSelectedPlaceCard;
