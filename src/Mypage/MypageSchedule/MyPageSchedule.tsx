import { useEffect, useRef, useState } from "react";
import MypageScheduleModal from "./components/MypageScheduleModal";
import "./mypageSchedule.css";
import MypageSizeController from "../components/MypageSizeController";

import { fetchSchedulesMAPI } from "apis/schedule";
import MypageSort from "../components/MypageSort";
import MypageSearch from "../components/MypageSearch";
import MypageScheduleCard from "./components/MypageScheduleCard";
import MypagePagination from "Mypage/components/MypagePagination";

const MypageSchedule = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(1);
  const [size, setSize] = useState(12);
  const [sort, setSort] = useState<string[]>(["registeDate", "desc"]);
  const [open, setOpen] = useState(false);
  const [field, setField] = useState<{ name: string; nested?: string[] }>({
    name: "registerDate",
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const numPages = Math.ceil(total / size); // 총 페이지 개수
  const offset = (page - 1) * size;
  const [selections, setSelections] = useState<(string | number)[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchSchedulesMAPI()
      .then((res) => {
        if (!res) {
          setLoading(false);
          return;
        }
        const receivedItems = res.data;
        const length = res?.data.length;
        setItems(receivedItems);
        setTotal(length);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  console.log(items);

  return (
    <>
      <MypageScheduleModal />
      <div className="mypage-schedule">
        <div className="mypage-schedule-container">
          <section className="mypage-schedule-panels">
            <span className="mypage-schedule-panels-left">
              <MypageSizeController size={size} setSize={setSize} />
            </span>
            <span className="mypage-schedule-panels-right">
              <MypageSearch
                field={field}
                items={items}
                setPage={setPage}
                setSearch={setSearch}
                setTotal={setTotal}
              />
              <MypageSort
                sort={sort}
                setSort={setSort}
                items={items}
                setItems={setItems}
              />
            </span>
          </section>
          <section className="mypage-schedule-grid">
            {items
              .filter((item) => {
                return item[field.name].includes(search);
              })
              .slice(offset, offset + size)
              .map((item) => (
                <MypageScheduleCard
                  key={item.scheduleId}
                  selections={selections}
                  setSelections={setSelections}
                  item={item}
                />
              ))}
          </section>
          <section className="mypage-schedule-pagination">
            <MypagePagination
              page={page}
              setPage={setPage}
              numPages={numPages}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default MypageSchedule;
