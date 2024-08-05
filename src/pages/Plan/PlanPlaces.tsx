import { useNavigate } from "react-router-dom";
import "./planPlaces.css";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useEffect, useState } from "react";
import { fetchPlacesAPI } from "apis/plan";
import { PlaceApiType } from "types/place";
import PlanPlaceCard from "./PlanPlaceCard";

export interface PlanPlacesProps {
  metroId: string;
}

const PlanPlaces = ({ metroId }: PlanPlacesProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState<PlaceApiType[]>([]);
  const [pageNo, setPageNo] = useState("1");
  const [contentTypeId, setContentTypeId] = useState("12");
  const [open, setOpen] = useState("place");
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchPlacesAPI(metroId, pageNo, contentTypeId)
      .then((res) => {
        if (!res) return;

        setPlaces(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [metroId, contentTypeId, pageNo]);

  console.log(places);

  const handleOpen = (containerName: string) => {
    if (containerName === open) {
      setOpen("");
    } else {
      if (containerName === "place") {
        setContentTypeId("12");
      } else if (containerName === "accomm") {
        setContentTypeId("32");
      }
      setOpen(containerName);
    }
  };

  const handleContentTypeId = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    contentTypeId: string
  ) => {
    e.stopPropagation();
    setContentTypeId(contentTypeId);
  };

  console.log(selectedPlaces);

  return (
    <div className="plan-places">
      <section className="plan-places-info">
        <h3 className="plan-placesd-info-title">장소</h3>
        <div className="plan-places-info-detail">
          <div>지역</div>
          <div>날짜</div>
        </div>
      </section>
      <section className="plan-places-btns">
        <button
          className="plan-places-btns before"
          onClick={() => navigate(-1)}
        >
          <LuChevronLeft />
          이전
        </button>
        <button
          className="plan-places-btns next"
          onClick={() => navigate(`#accomm`)}
        >
          다음
          <LuChevronRight />
        </button>
      </section>
      <section
        className={`plan-places-main place ${open === "place" ? "active" : ""}`}
        onClick={() => handleOpen("place")}
      >
        <div className="plan-places-main-title">
          <p>외부 api 장소</p>
          <span className="plan-places-main-title-icon">
            <IoIosArrowDropup />
          </span>
        </div>

        <ul className="plan-places-main-container">
          <div className="plan-places-main-tags">
            <span
              className={`plac-places-main-tags-item ${
                contentTypeId === "12" ? "active" : ""
              }`}
              onClick={(e) => handleContentTypeId(e, "12")}
            >
              관광
            </span>
            <span
              className={`plac-places-main-tags-item ${
                contentTypeId === "14" ? "active" : ""
              }`}
              onClick={(e) => handleContentTypeId(e, "14")}
            >
              문화
            </span>
            <span
              className={`plac-places-main-tags-item ${
                contentTypeId === "39" ? "active" : ""
              }`}
              onClick={(e) => handleContentTypeId(e, "39")}
            >
              음식
            </span>
          </div>
          {loading ? (
            <li className="plan-places-main-loading">loading</li>
          ) : (
            places.map((place) => (
              <PlanPlaceCard
                place={place}
                metroId={metroId}
                selectedPlaces={selectedPlaces}
                setSelectedPlaces={setSelectedPlaces}
                key={place.contentid}
              />
            ))
          )}
        </ul>
      </section>
      <section
        className={`plan-places-main accomm ${
          open === "accomm" ? "active" : ""
        }`}
        onClick={() => handleOpen("accomm")}
      >
        <div className="plan-places-main-title">
          <p>외부 api 숙소</p>
          <span className="plan-places-main-title-icon">
            <IoIosArrowDropup />
          </span>
        </div>
        <ul className="plan-places-main-container">
          <div className="plan-places-main-tags">
            <span
              className={`plac-places-main-tags-item ${
                contentTypeId === "32" ? "active" : ""
              }`}
            >
              숙소
            </span>
          </div>
          {loading ? (
            <li className="plan-places-main-loading">loading</li>
          ) : (
            places.map((place) => (
              <PlanPlaceCard
                place={place}
                metroId={metroId}
                selectedPlaces={selectedPlaces}
                setSelectedPlaces={setSelectedPlaces}
                key={place.contentid}
              />
            ))
          )}
        </ul>
      </section>
      <section
        className={`plan-places-main selected ${
          open === "selected" ? "active" : ""
        }`}
        onClick={() => handleOpen("selected")}
      >
        <div className="plan-places-main-title">
          <p>선택한 장소</p>
          <span className="plan-places-main-title-icon">
            <IoIosArrowDropup />
          </span>
        </div>
        <ul className="plan-places-main-container">
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
        </ul>
      </section>
    </div>
  );
};

export default PlanPlaces;
