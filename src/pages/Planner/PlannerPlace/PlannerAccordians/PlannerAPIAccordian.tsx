import React, { useEffect, useState } from "react";
import "./plannerAPIAccordian.css";
import { IoIosArrowDropup } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { debounce } from "utilities/debounce";
import PlannerAPIPlaceCard from "../PlannerCards/PlannerAPIPlaceCard";
import { PlaceApiType } from "types/place";
import { ColumnType } from "types/plan";
import { fetchPlacesAPI } from "apis/place";
export interface PlannerAPIAccordianProps {
  dates: Date[];
  metroId: string;
  openAccordian: string;
  handleOpenAccordian: (accordianName: string, contentTypeId?: string) => void;
  apiInfo: {
    name: string;
    key: string;
    tags: { name: string; contentTypeId: string }[];
  };
  columns: { [key: string]: ColumnType[] };
  setColumns: React.Dispatch<
    React.SetStateAction<{
      [key: string]: ColumnType[];
    }>
  >;
  contentTypeId: string;
  setContentTypeId: (value: string) => void;
}

const PlannerAPIAccordian = ({
  dates,
  metroId,
  openAccordian,
  handleOpenAccordian,
  apiInfo,
  columns,
  setColumns,
  contentTypeId,
  setContentTypeId,
}: PlannerAPIAccordianProps) => {
  const [loading, setLoading] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState<PlaceApiType[]>([]);
  const [pageNo, setPageNo] = useState("1");

  useEffect(() => {
    if (contentTypeId.length === 0) return;
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

  // api 이용을 하나만 가능하도록 하기
  const [isRequesting, setIsRequesting] = useState(false);

  // 검색창 열기
  const handleOpenSearch = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();

    setOpenSearch(!openSearch);
  };

  // 검색어 저장
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value;

    setSearch(value);
  };

  // 렌더링을 줄이기 위한 debounce
  const debouncedSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  }, 500);

  //
  const hanldeContentTypeId = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    contentTypeId: string
  ) => {
    e.stopPropagation();
    setContentTypeId(contentTypeId);
  };

  return (
    <section
      className={`planner-places-accordian-api${
        openAccordian === apiInfo.key ? " active" : ""
      }`}
      onClick={() =>
        handleOpenAccordian(apiInfo.key, apiInfo.key === "places" ? "12" : "32")
      }
    >
      <div className="planner-places-accordian-api-title">
        <p className="planner-places-accordian-api-title-name">
          {apiInfo.name}
        </p>
        <p
          className={`planner-places-accordian-api-title-icon${
            openAccordian === apiInfo.key ? " active" : ""
          }`}
        >
          <IoIosArrowDropup />
        </p>
      </div>
      <ul
        className={`planner-places-accordian-api-container${
          openAccordian === apiInfo.key ? " active" : ""
        }`}
      >
        <ul className="planner-places-accordian-api-tags">
          {apiInfo.tags.map((tag) => (
            <li
              key={tag.contentTypeId}
              className={`planner-places-accordian-api-tags-tag${
                contentTypeId === tag.contentTypeId ? " active" : ""
              }`}
              onClick={(e) => hanldeContentTypeId(e, tag.contentTypeId)}
            >
              {tag.name}
            </li>
          ))}
          <span
            className={`planner-places-accordian-api-tags-search${
              openSearch ? " active" : ""
            }`}
            onClick={(e) => handleOpenSearch(e)}
          >
            <input
              type="text"
              className={`planner-places-accordian-api-tags-search-box${
                openSearch ? " active" : ""
              }`}
              onClick={(e) => e.stopPropagation()}
              onChange={debouncedSearch}
              placeholder="검색어를 입력하세요."
            />
            <span className="planner-places-accordian-api-tags-search-icon">
              <LuSearch />
            </span>
          </span>
        </ul>
        <ul
          className={`planner-places-accordian-api-main${
            loading ? " loading" : ""
          }`}
        >
          {places.length === 0 ? (
            <li className="planner-places-accordian-api-main-noresult">
              검색 결과가 없습니다.
            </li>
          ) : (
            places.map((place) => (
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
            ))
          )}
        </ul>
      </ul>
    </section>
  );
};

// openAccordian과 contentTypeId가 업데이트 되는 경우에만 렌더링이 이루어짐
export default React.memo(PlannerAPIAccordian, (prevProps, nextProps) => {
  return (
    prevProps.openAccordian === nextProps.openAccordian &&
    prevProps.contentTypeId === nextProps.contentTypeId &&
    prevProps.columns === nextProps.columns
  );
});
