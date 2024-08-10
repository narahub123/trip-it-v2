import { useState } from "react";
import "./plannerAPIAccordian.css";
import { IoIosArrowDropup } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { debounce } from "utilities/debounce";
import { plannerTests } from "test/data/planner";
import PlannerAPIPlaceCard from "../PlannerCards/PlannerAPIPlaceCard";
import { PlaceApiType } from "types/place";
import { ColumnType } from "types/plan";
import PlannerDateCard from "../PlannerCards/PlannerDateCard";
import { convertDateTypeToDate2 } from "utilities/date";
export interface PlannerAPIAccordianProps {
  dates: Date[];
  metroId: string;
  openAccordian: string;
  handleOpenAccordian: (value: string) => void;
  apiInfo: {
    name: string;
    key: string;
    tags: { name: string; contentTypeId: string }[];
  };
  columns: { [key: string]: ColumnType[] };
  setColumns: (value: { [key: string]: ColumnType[] }) => void;
}

const PlannerAPIAccordian = ({
  dates,
  metroId,
  openAccordian,
  handleOpenAccordian,
  apiInfo,
  columns,
  setColumns,
}: PlannerAPIAccordianProps) => {
  const [contentTypeId, setContentTypeId] = useState("12");
  const [openSearch, setOpenSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState<PlaceApiType[]>([]);

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

  // test

  return (
    <section
      className={`planner-places-accordian-api${
        openAccordian === apiInfo.key ? " active" : ""
      }`}
      onClick={() => handleOpenAccordian(apiInfo.key)}
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
        <ul className="planner-places-accordian-api-main">
          {plannerTests.map((place) => (
            <PlannerAPIPlaceCard
              key={place.contentid}
              dates={dates}
              place={place}
              metroId={metroId}
              isRequesting={isRequesting}
              setIsRequesting={setIsRequesting}
              selectedPlaces={selectedPlaces}
              setSelectedPlaces={setSelectedPlaces}
              columns={columns}
              setColumns={setColumns}
            />
          ))}
        </ul>
      </ul>
    </section>
  );
};

export default PlannerAPIAccordian;
