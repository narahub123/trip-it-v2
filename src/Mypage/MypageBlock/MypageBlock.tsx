import { useEffect, useState } from "react";
import "./mypageBlock.css";
import { fetchBlockAPI } from "apis/block";
import MypageBlockModal from "./components/MypageBlockModal";
import MypageSizeController from "Mypage/components/MypageSizeController";
import MypageSort from "Mypage/components/MypageSort";
import { mypageBlockSnSArray } from "Mypage/data/mypage";
import MypageBlockCard from "./components/MypageBlockCard";
import MypageSearch from "Mypage/components/MypageSearch";
import MypagePagination from "Mypage/components/MypagePagination";

const MypageBlock = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(1);
  const [size, setSize] = useState(12);
  const [sort, setSort] = useState<string[]>(["blockDate", "desc"]);
  const [open, setOpen] = useState(false);
  const [field, setField] = useState<{ name: string; nested?: string[] }>({
    name: "blockDate",
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const numPages = Math.ceil(total / size); // 총 페이지 개수
  const offset = (page - 1) * size;
  const [selections, setSelections] = useState<(string | number)[]>([]);
  const [message, setMessage] = useState<{
    type: string;
    msgs: { title: string; detail: string };
  }>();

  useEffect(() => {
    setTotal(items.length);
  }, [items]);
  useEffect(() => {
    setLoading(true);
    fetchBlockAPI()
      .then((res) => {
        if (!res) {
          setLoading(false);
          return;
        }
        const receivedItems = res.data;
        setItems(receivedItems);
        setTotal(receivedItems.length);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <MypageBlockModal />
      <div className="mypage-block">
        <div className="mypage-block-container">
          <section className="mypage-block-panels">
            <span className="mypage-block-panels-left">
              <MypageSizeController size={size} setSize={setSize} />
            </span>
            <span className="mypage-block-panels-right">
              <MypageSort
                sort={sort}
                setSort={setSort}
                items={items}
                setItems={setItems}
                sortNSearchArray={mypageBlockSnSArray}
              />
            </span>
          </section>
          {items.length === 0 && (
            <li className="mypage-block-grid-empty">검색 결과가 없습니다.</li>
          )}
          <section className="mypage-block-grid">
            {items
              .filter((item) => {
                return item[field.name].includes(search);
              })
              .slice(offset, offset + size)
              .map((item) => (
                <MypageBlockCard key={item.blockId} item={item} />
              ))}
          </section>
          <section className="mypage-block-search">
            <MypageSearch
              sortNSearchArray={mypageBlockSnSArray}
              search={search}
              setSearch={setSearch}
              setPage={setPage}
              items={items}
              field={field}
              setField={setField}
              setTotal={setTotal}
            />
          </section>
          <section className="mypage-block-pagination">
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

export default MypageBlock;
