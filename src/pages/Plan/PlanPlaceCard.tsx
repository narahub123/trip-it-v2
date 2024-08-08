import { PlaceApiType } from "types/place";
import "./planPlaceCard.css";
import { LuCheck, LuChevronUp, LuPlus } from "react-icons/lu";
import { metros } from "data/metros";

import { useState } from "react";
import { fetchPlaceAPI } from "apis/place";

export interface PlanPlaceCardProps {
  place: PlaceApiType;
  metroId: string;
  selectedPlaces: PlaceApiType[];
  setSelectedPlaces: (value: PlaceApiType[]) => void;
}

const PlanPlaceCard = ({
  place,
  metroId,
  selectedPlaces,
  setSelectedPlaces,
}: PlanPlaceCardProps) => {
  const [loading, setLoading] = useState(false);
  const [openDepict, setOpenDepict] = useState(false);

  const defaultImage = metros.find(
    (metro) => metro.areaCode === metroId
  )?.imgUrl;

  const [selectedPlace, setSelectedPlace] = useState<PlaceApiType>();

  const handlePlace = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    contentId: string
  ) => {
    e.stopPropagation();
    setOpenDepict(!openDepict);
    setLoading(true);

    fetchPlaceAPI(contentId)
      .then((res) => {
        if (!res) return;
        console.log(res.data);

        setSelectedPlace(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 0) {
          console.log("네트워크 오류, 연결 상태 확인 요망");
        }
        setLoading(false);
      });
  };

  const handleSelect = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    contentId: string
  ) => {
    e.stopPropagation();

    const contentIds = selectedPlaces.map((place) => place.contentid);

    if (contentIds.includes(contentId)) {
      const newSelections = selectedPlaces.filter(
        (selectedPlace) => selectedPlace.contentid !== contentId
      );

      setSelectedPlaces(newSelections);
    } else {
      fetchPlaceAPI(contentId)
        .then((res) => {
          if (!res) return;

          const newPlace = res.data[0];

          setSelectedPlaces([...selectedPlaces, newPlace]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);

          if (err.code === 6) {
            alert("API 데이터 소진");
          }

          setLoading(false);
        });
    }
  };

  return (
    <li className="plan-places-main-card">
      <div className="plan-places-main-card-upper">
        <span
          className="plan-places-main-card-info"
          onClick={(e) => handlePlace(e, place.contentid)}
        >
          <span className="plan-places-main-card-info-photo">
            <img src={place.firstimage || defaultImage} alt="" />
          </span>
          <span className="plan-places-main-card-info-detail">
            <div className="plan-places-main-card-info-detail-title">
              {place.title}{" "}
              <span className="place-places-main-card-info-detail-title-more">
                <LuChevronUp />
              </span>
            </div>
            <div className="plan-places-main-card-info-detail-addr">
              {place.addr1}
            </div>
          </span>
        </span>
        <span
          className="plan-places-main-card-btn"
          onClick={(e) => handleSelect(e, place.contentid)}
        >
          {selectedPlaces.map((p) => p.contentid).includes(place.contentid) ? (
            <button className="plan-places-main-card-btn-checked">
              <LuCheck />
            </button>
          ) : (
            <button className="plan-places-main-card-btn-plus">
              <LuPlus />
            </button>
          )}
        </span>
      </div>
      <div
        className={`plan-places-main-card-lower${openDepict ? "-active" : ""}`}
      >
        <div className="plan-places-main-card-depict">
          <div className="plan-places-main-card-depict-title">설명</div>
          {loading ? (
            "loading..."
          ) : (
            <div className="plan-places-main-card-depict-main">
              {selectedPlace?.overview}
            </div>
          )}
        </div>
        <div className="plan-places-main-card-map">map</div>
      </div>
    </li>
  );
};

export default PlanPlaceCard;
