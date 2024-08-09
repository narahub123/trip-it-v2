import { Dispatch, useState } from "react";
import "./planSelectedPlaceCard.css";
import { metros } from "data/metros";
import { PlaceApiType } from "types/place";
import { LuCheck, LuChevronUp, LuMoreHorizontal } from "react-icons/lu";
import { convertDateTypeToDate1, convertDateTypeToDate2 } from "utilities/date";
import { ColumnType } from "types/plan";

export interface PlanSelectedPlaceCardProps {
  metroId: string;
  contentId: string;
  selectedPlace: PlaceApiType;
  selectedPlaces: PlaceApiType[];
  setSelectedPlaces: (value: PlaceApiType[]) => void;
  dates: Date[];
  columns: { [key: string]: ColumnType[] };
  setColumns: (value: { [key: string]: ColumnType[] }) => void;
  setOpenAccordian: (value: string) => void;
}

const PlanSelectedPlaceCard = ({
  metroId,
  contentId,
  selectedPlace,
  selectedPlaces,
  setSelectedPlaces,
  dates,
  columns,
  setColumns,
  setOpenAccordian,
}: PlanSelectedPlaceCardProps) => {
  const [loading, setLoading] = useState(false);
  const [openDepict, setOpenDepict] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const defaultImage = metros.find(
    (metro) => metro.areaCode === metroId
  )?.imgUrl;

  const handlePlace = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    contentId?: string
  ) => {
    e.stopPropagation();
    setOpenDepict(!openDepict);
  };

  const handleDeSelect = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    contentId?: string
  ) => {
    e.stopPropagation();

    const newSelections = selectedPlaces.filter(
      (selectedPlace) => selectedPlace.contentid !== contentId
    );

    setSelectedPlaces(newSelections);
  };

  // 선택 삭제 하기
  const handleDeselect = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    contentId?: string 
  ) => {
    e.stopPropagation();

    const newSelections = selectedPlaces.filter(
      (selectedPlace) => selectedPlace.contentid !== contentId
    );

    setSelectedPlaces(newSelections);
  };

  // 선택한 날짜를 특정 날짜로 이동 시키기
  const handleAdd = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    date: Date,
    order: number
  ) => {
    e.stopPropagation();
    const newDetail = {
      place: selectedPlace,
      scheduleOrder: order,
      startTime: "06:00",
      endTime: "07:00",
    };
    const newPlaces = selectedPlaces.filter((pl) => pl.contentid !== contentId);

    const value = columns[convertDateTypeToDate2(date)];

    const newColumns = {
      ...columns,
      [convertDateTypeToDate2(date)]: [...value, newDetail],
    };

    setSelectedPlaces(newPlaces);
    setColumns(newColumns);
    setOpenDropdown(false);

    console.log("갯수", selectedPlaces.length);

    if (selectedPlaces.length === 1) {
      setOpenAccordian(convertDateTypeToDate2(date));
    }
  };

  const handleDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setOpenDropdown(!openDropdown);
  };

  return (
    <li className="plan-places-main-selectedcard">
      <div className="plan-places-main-selectedcard-upper">
        <span
          className="plan-places-main-selectedcard-info"
          onClick={(e) => handlePlace(e, selectedPlace.contentid)}
        >
          <span className="plan-places-main-selectedcard-info-photo">
            <img src={selectedPlace.firstimage || defaultImage} alt="" />
          </span>
          <span className="plan-places-main-selectedcard-info-detail">
            <div className="plan-places-main-selectedcard-info-detail-title">
              <span
                className={`plan-places-main-selectedcard-info-detail-title-type ${
                  selectedPlace.contenttypeid === "12"
                    ? "tour"
                    : selectedPlace.contenttypeid === "14"
                    ? "culture"
                    : selectedPlace.contenttypeid === "39"
                    ? "food"
                    : selectedPlace.contenttypeid === "32"
                    ? "accomm"
                    : ""
                }`}
              >
                {selectedPlace &&
                  (selectedPlace.contenttypeid === "12"
                    ? "관광"
                    : selectedPlace.contenttypeid === "14"
                    ? "문화"
                    : selectedPlace.contenttypeid === "39"
                    ? "식당"
                    : selectedPlace.contenttypeid === "32"
                    ? "숙소"
                    : "기타")}
              </span>
              {selectedPlace.title}{" "}
              <span className="place-places-main-card-info-detail-title-more">
                <LuChevronUp />
              </span>
            </div>
            <div className="plan-places-main-selectedcard-info-detail-addr">
              {selectedPlace.addr1}
            </div>
          </span>
        </span>
        <span className="plan-places-main-selectedcard-btn">
          <button
            className="plan-places-main-selectedcard-btn-more"
            onClick={(e) => handleDropdown(e)}
          >
            <LuMoreHorizontal />
          </button>
          <ul
            className={`plan-places-main-selectedcard-btn-container${
              openDropdown ? " active" : ""
            }`}
          >
            <li
              className="plan-places-main-selectedcard-btn-item"
              onClick={(e) => handleDeselect(e, selectedPlace.contentid)}
            >
              삭제
            </li>
            {dates.map((date, index) => (
              <li
                className="plan-places-main-selectedcard-btn-item"
                onClick={(e) => handleAdd(e, date, index + 1)}
                key={convertDateTypeToDate1(date)}
              >
                {convertDateTypeToDate1(date)}
              </li>
            ))}
          </ul>
        </span>
      </div>
      <div
        className={`plan-places-main-selectedcard-lower${
          openDepict ? "-active" : ""
        }`}
      >
        <div className="plan-places-main-selectedcard-depict">
          <div className="plan-places-main-selectedcard-depict-title">설명</div>
          {loading ? (
            "loading..."
          ) : (
            <div className="plan-places-main-selectedcard-depict-main">
              {selectedPlace.overview}
            </div>
          )}
        </div>
        <div className="plan-places-main-selectedcard-map">map</div>
      </div>
    </li>
  );
};

export default PlanSelectedPlaceCard;
