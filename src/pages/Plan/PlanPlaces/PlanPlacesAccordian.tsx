import { IoIosArrowDropup } from "react-icons/io";
import "./planPlacesAccordian.css";
import React, { useEffect, useState } from "react";
import PlanPlaceCard from "../PlanPlaceCard";
import { PlaceApiType } from "types/place";
import { fetchPlacesAPI } from "apis/place";

export interface PlanPlacesAccordianProps {
  openAccordian: string;
  setOpenAccordian: (value: string) => void;
  accordianInfo: {
    name: string;
    key: string;
    tags: { name: string; contentTypeId: string }[];
  };
  contentTypeId: string;
  setContentTypeId: (value: string) => void;
  selectedPlaces: PlaceApiType[];
  setSelectedPlaces: (value: PlaceApiType[]) => void;
  metroId: string;
}

const PlanPlacesAccordian = ({
  openAccordian,
  setOpenAccordian,
  contentTypeId,
  setContentTypeId,
  selectedPlaces,
  setSelectedPlaces,
  metroId,
  accordianInfo,
}: PlanPlacesAccordianProps) => {
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState<PlaceApiType[]>([]);
  const [pageNo, setPageNo] = useState("1");

  useEffect(() => {
    setLoading(true);
    fetchPlacesAPI(metroId, pageNo, contentTypeId)
      .then((res) => {
        if (!res) return;

        console.log(res.data);

        setPlaces(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.code === 0) {
          console.log("네트워크 오류, 연결 상태 확인 요망");
        }
        setLoading(false);
      });
  }, [metroId, contentTypeId, pageNo]);

  // 아코디언을 여닫는 함수
  const HandleOpen = (accordian: string) => {
    console.log("저장", openAccordian);
    console.log("요청", accordian);

    // 저장된 아코디언과 같은 아코디언을 요청한 경우
    if (accordian === openAccordian) {
      // 닫기
      return setOpenAccordian("close");
      // 장소를 요청하는 경우
    } else if (accordian === "places") {
      // 관광지 요청
      setContentTypeId("12");
      // 숙소를 요청하는 경우
    } else if (accordian === "accomm") {
      // 숙소 요청
      setContentTypeId("32");
      // 그외의 경우
    } else {
      return setOpenAccordian(accordian);
    }

    setOpenAccordian(accordian);
  };

  const handleContentTypeId = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    contentTypeId: string
  ) => {
    e.stopPropagation();

    setContentTypeId(contentTypeId);
  };

  // 제출

  return (
    <section
      className={`plan-places-accordian${
        openAccordian === accordianInfo.key ? " active" : ""
      }`}
      onClick={() => HandleOpen(accordianInfo.key)}
    >
      <div className="plan-places-accordian-title">
        <p className="plan-places-accordian-title-name">{accordianInfo.name}</p>
        <span className="plan-places-accordian-title-icon">
          <IoIosArrowDropup />
        </span>
      </div>

      <div className="plan-places-accordian-container">
        <div className="plan-places-accordian-tags">
          {accordianInfo.tags.map((tag) => (
            <span
              key={tag.contentTypeId}
              className={`plan-places-accordian-tags-item${
                contentTypeId === tag.contentTypeId ? " active" : ""
              }`}
              onClick={(e) => handleContentTypeId(e, tag.contentTypeId)}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <ul className="plan-places-accordian-places">
          {loading ? (
            <li className="plan-places-accordian-places-loading">loading...</li>
          ) : places.length === 0 ? (
            <li className="plan-places-accordian-places-loading">
              검색 결과가 없습니다.
            </li>
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
      </div>
    </section>
  );
};

// export default PlanPlacesAccordian;

// openAccordian과 contentTypeId가 업데이트 되는 경우에만 렌더링이 이루어짐
export default React.memo(PlanPlacesAccordian, (prevProps, nextProps) => {
  return (
    prevProps.openAccordian === nextProps.openAccordian &&
    prevProps.contentTypeId === nextProps.contentTypeId &&
    prevProps.selectedPlaces === nextProps.selectedPlaces
  );
});
