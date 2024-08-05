import { useEffect, useState } from "react";
import "./planSelectedPlaceCard.css";
import { metros } from "data/metros";
import { PlaceApiType } from "types/place";
import { fetchPlaceAPI } from "apis/plan";
import { LuCheck, LuChevronUp } from "react-icons/lu";

export interface PlanSelectedPlaceCardProps {
  metroId: string;
  contentId: string;
  selectedPlaces: string[];
  setSelectedPlaces: (value: string[]) => void;
}

const PlanSelectedPlaceCard = ({
  metroId,
  contentId,
  selectedPlaces,
  setSelectedPlaces,
}: PlanSelectedPlaceCardProps) => {
  const [loading, setLoading] = useState(false);
  const [openDepict, setOpenDepict] = useState(false);
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

  const handlePlace = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    contentId?: string
  ) => {
    e.stopPropagation();
    setOpenDepict(!openDepict);
  };

  const handleSelect = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    contentId?: string
  ) => {
    e.stopPropagation();

    const newSelections = selectedPlaces.filter(
      (selectedPlace) => selectedPlace !== contentId
    );

    setSelectedPlaces(newSelections);
  };

  return (
    <li className="plan-places-main-selectedcard">
      <div className="plan-places-main-selectedcard-upper">
        <span
          className="plan-places-main-selectedcard-info"
          onClick={(e) => handlePlace(e, place?.contentid)}
        >
          <span className="plan-places-main-selectedcard-info-photo">
            <img src={place?.firstimage || defaultImage} alt="" />
          </span>
          <span className="plan-places-main-selectedcard-info-detail">
            <div className="plan-places-main-selectedcard-info-detail-title">
              {place?.title}{" "}
              <span className="place-places-main-card-info-detail-title-more">
                <LuChevronUp />
              </span>
            </div>
            <div className="plan-places-main-selectedcard-info-detail-addr">
              {place?.addr1}
            </div>
          </span>
        </span>
        <span
          className="plan-places-main-selectedcard-btn"
          onClick={(e) => handleSelect(e, place?.contentid)}
        >
          <button className="plan-places-main-selectedcard-btn-checked">
            <LuCheck />
          </button>
        </span>
      </div>
      <div
        className={`plan-places-main-selectedcard-lower${openDepict ? "-active" : ""}`}
      >
        <div className="plan-places-main-selectedcard-depict">
          <div className="plan-places-main-selectedcard-depict-title">설명</div>
          {loading ? (
            "loading..."
          ) : (
            <div className="plan-places-main-selectedcard-depict-main">
              {place?.overview}
            </div>
          )}
        </div>
        <div className="plan-places-main-selectedcard-map">map</div>
      </div>
    </li>
  );
};

export default PlanSelectedPlaceCard;
