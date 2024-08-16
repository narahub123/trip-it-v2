import { fetchPlacesAPI, fetchPlacesByKeywordAPI } from "apis/place";
import "./plannerPcPlaces.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { PlaceApiType } from "types/place";
import { ColumnType } from "types/plan";
import PlannerPcAPIPlaceCard from "../components/PlannerPcAPIPlaceCard";
import { convertDateTypeToDate1, convertDateTypeToDate2 } from "utilities/date";
import PlannerPcDateCard from "../components/PlannerPcDateCard";
import { LuLoader2, LuSearch } from "react-icons/lu";
import PlannerSearch from "pages/Planner/components/PlannerSearch/PlannerSearch";
import { debounce } from "utilities/debounce";
import { useRenderCount } from "@uidotdev/usehooks";

export interface PlannerPcPlaces {
  metroId: string;
  dates: Date[];
  columns: { [key: string]: ColumnType[] };
  setColumns: React.Dispatch<
    React.SetStateAction<{
      [key: string]: ColumnType[];
    }>
  >;
  date: Date;
  setDate: (value: Date) => void;
}
const PlannerPcPlaces = ({
  metroId,
  dates,
  columns,
  setColumns,
  date,
  setDate,
}: PlannerPcPlaces) => {
  const renderCount = useRenderCount();
  console.log("장소 페이지 렌더링 횟수", renderCount);

  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState("0");
  const [places, setPlaces] = useState<PlaceApiType[]>([]);
  const [isRequesting, setIsRequesting] = useState(false);
  const [contentTypeId, setContentTypeId] = useState("12");

  // 무한 스크롤링을 위한 타겟 ref
  const targetRef = useRef<HTMLLIElement>(null);

  // 이동 효과 관련
  const [moveClassGroup, setMoveClassGroup] = useState<string[]>([]);
  const [moveOrderGroup, setMoveOrderGroup] = useState<number[]>([]);

  // 검색 창 열기
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");

  // 검색 관련 함수
  // 검색창 열기
  const handleOpenSearch = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setOpenSearch(!openSearch);
  };

  // 검색어 저장
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target?.value.trim() || "";

    setSearch(value);
    debouncedSearch(value);
  };

  const fetchPlacesByKeyword = async (keyword: string) => {
    setLoading(true);
    try {
      let res;

      if (keyword === "") {
        res = await fetchPlacesAPI(metroId, pageNo, contentTypeId);
      } else {
        res = await fetchPlacesByKeywordAPI(
          metroId,
          pageNo,
          contentTypeId,
          keyword
        );
      }

      if (!res.data) {
        setPlaces(res);
        setLoading(false);
      } else {
        setPlaces(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 렌더링을 줄이기 위한 debounce
  const debouncedSearch = useCallback(
    debounce((keyword: string) => fetchPlacesByKeyword(keyword), 500),
    [metroId, pageNo, contentTypeId]
  );

  const column = date ? columns[convertDateTypeToDate2(date)] : [];

  // 무한 스크롤링을 위한 useEffect
  useEffect(() => {
    if (!targetRef.current) return;
    console.log("타겟확인");

    observer.observe(targetRef.current);
  }, []);

  useEffect(() => {
    if (contentTypeId.length === 0) return;
    if (pageNo === "0") {
      return;
    }
    setLoading(true);

    fetchPlacesAPI(metroId, pageNo, contentTypeId)
      .then((res) => {
        if (!res) return;

        const newPlaces = !res.data ? res : res.data;

        setPlaces((prevPlaces) => {
          return [...prevPlaces, ...newPlaces];
        });
      })
      .catch((err) => {
        if (err.code === 0) {
          console.log("네트워크 오류, 연결 상태 확인 요망");
        }
      })
      .finally(() => setLoading(false));
  }, [metroId, contentTypeId, pageNo]);

  const options = {
    threshold: 1.0,
  };

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    // intersecting 여부 확인하기
    const target = entries[0];

    // 타겟이 없거나 로드 중이거나 타겟이 인터섹팅 중이 아닌 경우 리턴
    if (!targetRef.current || loading || !target.isIntersecting) return;
    setPageNo((prev) => (Number(prev) + 1).toString());
  }, []);

  const observer = new IntersectionObserver(callback, options);

  const handleContentTypeId = useCallback(
    (contentTypeId: string) => {
      setContentTypeId(contentTypeId);

      setPageNo("0");
      setPlaces([]);
    },
    [contentTypeId]
  );
  return (
    <div className="planner-pc-places">
      <section className="planner-pc-places-place">
        <div className="planner-pc-places-place-tags">
          <ul className="planner-pc-places-place-tags-container">
            <li
              className={`planner-pc-places-place-tags-tag${
                contentTypeId === "12" ? " active" : ""
              }${loading ? " loading" : ""}`}
              onClick={loading ? undefined : () => handleContentTypeId("12")}
            >
              관광
            </li>
            <li
              className={`planner-pc-places-place-tags-tag${
                contentTypeId === "14" ? " active" : ""
              }${loading ? " loading" : ""}`}
              onClick={loading ? undefined : () => handleContentTypeId("14")}
            >
              문화
            </li>
            <li
              className={`planner-pc-places-place-tags-tag${
                contentTypeId === "39" ? " active" : ""
              }${loading ? " loading" : ""}`}
              onClick={loading ? undefined : () => handleContentTypeId("39")}
            >
              음식
            </li>
            <li
              className={`planner-pc-places-place-tags-tag${
                contentTypeId === "32" ? " active" : ""
              }${loading ? " loading" : ""}`}
              onClick={loading ? undefined : () => handleContentTypeId("32")}
            >
              숙소
            </li>
            <PlannerSearch
              openSearch={openSearch}
              search={search}
              onChange={onChange}
              handleOpenSearch={handleOpenSearch}
            />
          </ul>
        </div>
        <div
          className={`planner-pc-places-place-list${loading ? " loading" : ""}`}
        >
          {places.map((place) => (
            <PlannerPcAPIPlaceCard
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
          {/* 무한 스크롤링을 위한 타겟 설정 */}
          <li className={`planner-pc-places-place-list-target`} ref={targetRef}>
            {places.length !== 0 && (
              <span className={`icon${loading ? " loading" : ""}`}>
                <LuLoader2 />
              </span>
            )}
          </li>
        </div>
      </section>
      <section className="planner-pc-places-selected">
        <div className="planner-pc-places-selected-tags">
          {dates.map((item) => (
            <li
              key={convertDateTypeToDate1(item)}
              className={`planner-pc-places-selected-tags-tag${
                item === date ? " active" : ""
              }`}
              onClick={() => setDate(item)}
            >
              {convertDateTypeToDate1(item)}
            </li>
          ))}
        </div>
        <div className="planner-pc-places-selected-list">
          {!date && <li>날짜를 선택해주세요</li>}
          {date && !column && <li>장소를 선택해주세요</li>}
          {date &&
            column &&
            column.map((item, index) => (
              <PlannerPcDateCard
                key={`${item.place.contentid}_${index}`}
                column={column}
                order={index}
                date={date}
                dates={dates}
                detail={item}
                metroId={metroId}
                columns={columns}
                setColumns={setColumns}
                moveClassGroup={moveClassGroup}
                setMoveClassGroup={setMoveClassGroup}
                moveOrderGroup={moveOrderGroup}
                setMoveOrderGroup={setMoveOrderGroup}
              />
            ))}
        </div>
      </section>
    </div>
  );
};

export default PlannerPcPlaces;
