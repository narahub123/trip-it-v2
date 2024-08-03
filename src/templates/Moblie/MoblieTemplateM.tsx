import "./mobileTemplateM.css";
import { scheduleArray } from "test/data/schedules";
import { LuSearch, LuSettings, LuSlidersHorizontal } from "react-icons/lu";

import { useEffect, useRef, useState } from "react";
import MobileScheduleCard from "./MobileScheduleCard";
import MobileSearch from "./components/MobileSearch";
import MobileSetting from "./components/MobileSetting";
import MobileSort from "./components/MobileSort";
import { AxiosResponse } from "axios";
import { MessageType, TemplateArrayType } from "types/template";
import { mypageList } from "pages/mypage/data/header";
import MobilePostCard from "./MobilePostCard";
import MobileBlockCard from "./MobileBlockCard";

interface MobileTEmplateMProps {
  pageName: string;
  title: string;
  fetchAPI: () => Promise<AxiosResponse<any, any> | undefined>;
  deleteAPI?: (
    ids: (string | number)[]
  ) => Promise<AxiosResponse<any, any> | undefined>;
  defaultSort: string[];
  defaultSize: number;
  defaultField: { name: string; nested?: string[] };
  tempArray: TemplateArrayType[];
  msgArray: MessageType[];
  settings?: string[];
  card?: () => JSX.Element;
  tempoArray?: any[]; // 임시 배열 삭제 예정
}

const MoblieTemplateM = ({
  pageName,
  title,
  fetchAPI,
  deleteAPI,
  defaultSort,
  defaultSize,
  defaultField,
  tempArray,
  msgArray,
  settings,
  tempoArray,
}: MobileTEmplateMProps) => {
  const [items, setItems] = useState<any[]>([]); // 목록 상태
  const [sort, setSort] = useState<string[]>(defaultSort); // 정렬 상태
  const [selections, setSelections] = useState<(string | number)[]>([]);
  const [searchBox, setSearchBox] = useState(false);
  const [page, setPage] = useState(1); // 페이지 상태
  const [size, setSize] = useState(defaultSize); // 페이지 수 상태
  const [total, setTotal] = useState(1); // 총 아이템 수 상태
  const [search, setSearch] = useState(""); // 검색어 상태
  const [field, setField] = useState(defaultField); // 검색 필드 상태
  const [message, setMessage] = useState<MessageType>();
  const numPages = Math.ceil(total / size); // 총 페이지 개수
  const offset = (page - 1) * size;

  useEffect(() => {
    if (tempoArray) setItems(tempoArray);
  }, []);

  console.log("정렬 정보", sort);
  console.log("목록 정보", items);
  console.log("검색 필드", field);
  console.log("선택 목록", selections);
  console.log("검색어", search);

  return (
    <div className="mobile-mypage-template">
      <div className="mobile-mypage-template-container">
        <section className="mobile-mypage-template-panels">
          <span className="mobile-mypage-template-panels-left">
            <p className="mobile-mypage-template-panels-left-title">
              {/* ` */}
              {title}
            </p>
          </span>
          <span className="mobile-mypage-template-panels-right">
            <MobileSearch
              searchBox={searchBox}
              setSearchBox={setSearchBox}
              setField={setField}
              setSearch={setSearch}
              setPage={setPage}
              items={items}
              field={field}
              setTotal={setTotal}
              tempArray={tempArray}
              pageName={pageName}
              search={search}
            />
            <MobileSort
              items={items}
              setItems={setItems}
              sort={sort}
              setSort={setSort}
              tempArray={tempArray}
              defaultSort={defaultSort}
            />
            {settings && <MobileSetting />}
          </span>
        </section>
        <section
          className={`mobile-mypage-template-setting${
            selections.length === 0 ? "" : "-active"
          }`}
        >
          {selections.length !== 0 && <p>삭제</p>}
        </section>
        <section className="mobile-mypage-template-list">
          {items
            .filter((item) => {
              return item[field.name].includes(search);
            })
            .slice(offset, offset + size)
            .map((item) =>
              pageName === "mypage-block" ? (
                <MobileBlockCard
                  selections={selections}
                  setSelections={setSelections}
                  item={item}
                />
              ) : (
                ""
              )
            )}
        </section>
        <section className="mobile-mypage-template-grid">
          {(pageName === "mypage-schedules" || pageName === "mypage-posts") &&
            items
              .filter((item) => {
                return item[field.name].includes(search);
              })
              .slice(offset, offset + size)
              .map((item) => (
                <li className="mobile-mypage-template-item">
                  {pageName === "mypage-schedules" ? (
                    <MobileScheduleCard
                      selections={selections}
                      setSelections={setSelections}
                      item={item}
                    />
                  ) : (
                    pageName === "mypage-posts" && (
                      <MobilePostCard
                        selections={selections}
                        setSelections={setSelections}
                        item={item}
                      />
                    )
                  )}
                </li>
              ))}
        </section>
      </div>
    </div>
  );
};

export default MoblieTemplateM;
