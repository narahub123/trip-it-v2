import { PlaceApiType } from "types/place";
import "./planPlaceCard.css";
import { LuCheck, LuChevronUp, LuLoader, LuPlus } from "react-icons/lu";
import { metros } from "data/metros";

import React, { useState } from "react";
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
  const [isRequesting, setIsRequesting] = useState(false);

  const defaultImage = metros.find(
    (metro) => metro.areaCode === metroId
  )?.imgUrl;

  const [selectedPlace, setSelectedPlace] = useState<PlaceApiType>();

  const getPlaceDetail = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    contentId: string
  ) => {
    e.stopPropagation();

    // 설명 파트 여닫기
    setOpenDepict(!openDepict);

    // 설명 부분이 열려 있는 경우 api 요청을 하지 않고 되돌아 감
    if (openDepict) return;

    // 선택한 장소에 대한 정보와 요청 정보가 일치한다면 되돌아 감
    if (selectedPlace && selectedPlace.contentid === contentId) return;

    // 선택한 장소가 선택한 장소들의 목록에 존재하는지 확인
    const isExisted = selectedPlaces.find(
      (selectedPlace) => selectedPlace.contentid === contentId
    );

    // 선택한 장소들에 존재하는 정보인 경우 그 정보를 선택한 장소 정보에 추가
    if (isExisted) {
      setSelectedPlace(isExisted);
      return;
    }

    setLoading(true);
    if (isRequesting) return;

    setIsRequesting(true);

    fetchPlaceAPI(contentId)
      .then((res) => {
        if (!res) return;
        console.log(res.data);

        setSelectedPlace(res.data[0]);
        setLoading(false);
        setIsRequesting(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 0) {
          console.log("네트워크 오류, 연결 상태 확인 요망");
        }
        setLoading(false);
        setIsRequesting(false);
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
      setLoading(true);

      fetchPlaceAPI(contentId)
        .then((res) => {
          if (!res) return;

          console.log(res.data[0]);

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

  console.log(selectedPlaces);

  return (
    <li className="plan-places-main-card">
      <div className="plan-places-main-card-upper">
        <span
          className="plan-places-main-card-info"
          onClick={(e) => getPlaceDetail(e, place.contentid)}
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
          {loading ? (
            <button className="plan-places-main-card-btn-loading">
              <i>
                <LuLoader />
              </i>
            </button>
          ) : selectedPlaces
              .map((p) => p.contentid)
              .includes(place.contentid) ? (
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
