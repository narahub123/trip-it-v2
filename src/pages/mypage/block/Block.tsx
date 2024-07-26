import { useRenderCount } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import Template from "templates/Template";
import "./block.css";
import { blockArray } from "./test";
import { fetchBlockAPI } from "apis/block";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { handleFieldChange, handleSort, handleUnblock } from "../utils/block";
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronRight,
} from "react-icons/fi";
import {
  debouncedHandleSearchChange,
  debouncedHandleSizeChange,
} from "pages/Admin/Blocks/utils/block";
import { convertYYYYMMDDToDate1 } from "utilities/date";

const Block = () => {
  const renderCount = useRenderCount();
  const [items, setItems] = useState<any[]>([]); // 차단 목록 상태
  const [sort, setSort] = useState<string[]>(["blockDate", "desc"]); // 정렬 상태
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);
  const [search, setSearch] = useState("");
  const [field, setField] = useState("nickname");
  const [total, setTotal] = useState(1);

  // 페이징
  const offset = (page - 1) * size;
  const numPages = Math.ceil(total / size);

  // 차단 목록 불러오기
  useEffect(() => {
    fetchBlockAPI()
      .then((res) => {
        if (!res) return;
        const block = res.data;
        setItems(block);
        setTotal(block.length);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("렌더링 횟수", renderCount);

  return (
    <>
      <Template pageName={"block"} fetchAPI={fetchBlockAPI} />
      <div className="mypage-block">
        <section className="mypage-block-panels">
          <div className="admin-blocks-panels-sizeController">
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              defaultValue={size}
              onChange={debouncedHandleSizeChange(setSize)}
            />
            <span>{size}</span>
          </div>
        </section>
        <section className="mypage-block-search">
          <select id="field" onChange={(e) => handleFieldChange(e, setField)}>
            <option value="nickname">유저</option>
            <option value="blockDate">날짜</option>
          </select>
          <input
            type="text"
            onChange={debouncedHandleSearchChange(
              setSearch,
              setPage,
              items,
              field,
              setTotal
            )}
          />
        </section>
        <section className="mypage-block-pagination">
          <nav className="pagination">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="pageController"
            >
              <FiChevronsLeft />
            </button>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="pageController"
            >
              <FiChevronLeft />
            </button>
            {Array(numPages)
              .fill("_")
              .map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={page === i + 1 ? "pageNum active" : "pageNum"}
                >
                  {i + 1}
                </button>
              ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === numPages}
              className="pageController"
            >
              <FiChevronRight />
            </button>
            <button
              onClick={() => setPage(numPages)}
              disabled={page === numPages}
              className="pageController"
            >
              <FiChevronsRight />
            </button>
          </nav>
        </section>
      </div>
    </>
  );
};

export default Block;
