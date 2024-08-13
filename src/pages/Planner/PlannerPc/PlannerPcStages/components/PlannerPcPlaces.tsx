import { fetchPlacesAPI } from "apis/place";
import "./plannerPcPlaces.css";
import PlannerAPIPlaceCard from "pages/Planner/PlannerPlace/PlannerCards/PlannerAPIPlaceCard";
import { useEffect, useState } from "react";
import { PlaceApiType } from "types/place";
import { ColumnType } from "types/plan";

export interface PlannerPcPlaces {
  metroId: string;
  dates: Date[];
  columns: { [key: string]: ColumnType[] };
  setColumns: React.Dispatch<
    React.SetStateAction<{
      [key: string]: ColumnType[];
    }>
  >;
}
const PlannerPcPlaces = ({
  metroId,
  dates,
  columns,
  setColumns,
}: PlannerPcPlaces) => {
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState("1");
  const [places, setPlaces] = useState<PlaceApiType[]>([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const [contentTypeId, setContentTypeId] = useState("12");

  useEffect(() => {
    if (contentTypeId.length === 0) return;
    setLoading(true);

    fetchPlacesAPI(metroId, pageNo, contentTypeId)
      .then((res) => {
        if (!res) return;

        if (!res.data) {
          setPlaces(res);
          setLoading(false);
        } else {
          setPlaces(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.code === 0) {
          console.log("네트워크 오류, 연결 상태 확인 요망");
        }
        setLoading(false);
      });
  }, [metroId, contentTypeId, pageNo]);

  return (
    <div className="planner-pc-places">
      <section className="planner-pc-places-place">
        <div className="planner-pc-places-place-tags">
          <ul className="planner-pc-places-place-tags-container">
            <li
              className={`planner-pc-places-place-tags-tag${
                contentTypeId === "12" ? " active" : ""
              }`}
              onClick={() => setContentTypeId("12")}
            >
              관광
            </li>
            <li
              className={`planner-pc-places-place-tags-tag${
                contentTypeId === "14" ? " active" : ""
              }`}
              onClick={() => setContentTypeId("14")}
            >
              문화
            </li>
            <li
              className={`planner-pc-places-place-tags-tag${
                contentTypeId === "39" ? " active" : ""
              }`}
              onClick={() => setContentTypeId("39")}
            >
              음식
            </li>
            <li
              className={`planner-pc-places-place-tags-tag${
                contentTypeId === "32" ? " active" : ""
              }`}
              onClick={() => setContentTypeId("32")}
            >
              숙소
            </li>
          </ul>
        </div>
        <div
          className={`planner-pc-places-place-list${loading ? " loading" : ""}`}
        >
          {places.map((place) => (
            <PlannerAPIPlaceCard
              key={place.contentid}
              dates={dates}
              place={place}
              metroId={metroId}
              isRequesting={isRequesting}
              setIsRequesting={setIsRequesting}
              columns={columns}
              setColumns={setColumns}
            />
          ))}
        </div>
      </section>
      <section className="planner-pc-places-selected">선택한 장소</section>
    </div>
  );
};

export default PlannerPcPlaces;
