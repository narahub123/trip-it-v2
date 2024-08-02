import "./mobileTemplateM.css";
import { scheduleArray } from "test/data/schedules";
import { LuSearch, LuSettings, LuSlidersHorizontal } from "react-icons/lu";

import { useRef, useState } from "react";
import MobileScheduleCard from "./MobileScheduleCard";
import MobileSearch from "./components/MobileSearch";
import MobileSetting from "./components/MobileSetting";
import MobileSort from "./components/MobileSort";
import { AxiosResponse } from "axios";
import { MessageType, TemplateArrayType } from "types/template";

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
}: MobileTEmplateMProps) => {
  const [items, setItems] = useState<any[]>(scheduleArray); // 목록 상태
  const [sort, setSort] = useState<string[]>(defaultSort); // 정렬 상태
  const [selections, setSelections] = useState<(string | number)[]>([]);
  const [searchBox, setSearchBox] = useState(false);

  console.log("정렬 정보", sort);
  console.log("목록 정보", items);

  return (
    <div className="mobile-mypage-template">
      <div className="mobile-mypage-template-container">
        <section className="mobile-mypage-template-panels">
          <span className="mobile-mypage-template-panels-left">좌</span>
          <span className="mobile-mypage-template-panels-right">
            <MobileSearch searchBox={searchBox} setSearchBox={setSearchBox} />
            <MobileSort
              items={items}
              setItems={setItems}
              sort={sort}
              setSort={setSort}
              tempArray={tempArray}
              defaultSort={defaultSort}
            />
            <MobileSetting />
          </span>
        </section>
        <section className="mobile-mypage-template-list">
          {items.map((item) => (
            <li className="mobile-mypage-template-item">
              <MobileScheduleCard
                selections={selections}
                setSelections={setSelections}
                item={item}
              />
            </li>
          ))}
        </section>
      </div>
    </div>
  );
};

export default MoblieTemplateM;
