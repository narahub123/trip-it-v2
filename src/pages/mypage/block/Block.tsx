import { useRenderCount } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import Template from "templates/Template";
import "./block.css";
import { blockArray } from "./test";
import { fetchBlockAPI } from "apis/block";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { handleSort } from "../utils/block";
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronRight,
} from "react-icons/fi";
import { debouncedHandleSizeChange } from "pages/Admin/Blocks/utils/block";

const Block = () => {
  const renderCount = useRenderCount();
  const [items, setItems] = useState<any[]>(blockArray); // 차단 목록 상태
  const [sort, setSort] = useState<string[]>(["blockDate", "desc"]); // 정렬 상태
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);

  const offset = (page - 1) * size;
  const total = items ? items.length : 0;

  const numPages = Math.ceil(total / size);

  // 차단 목록 불러오기
  useEffect(() => {
    fetchBlockAPI()
      .then((res) => {
        console.log(res?.data);

        const block = res?.data;
        setItems(block);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("렌더링 횟수", renderCount);

  return (
    <>
      {/* <Template pageName="mypage-block" /> */}
      <div className="mypage-block">
        <section className="mypage-block-title">
          <h3>내 차단 목록 </h3>
        </section>
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
        <section className="mypage-block-main">
          <table className="mypage-block-main-table">
            <thead className="mypage-block-main-table-head">
              <tr className="mypage-block-main-table-head-tr">
                <th className="mypage-block-main-table-head-th">번호</th>
                <th
                  className="mypage-block-main-table-head-th"
                  data-key="nickname"
                  data-value="desc"
                  onClick={(e) => handleSort(e, items, setItems, setSort)}
                >
                  차단 당한 유저{" "}
                  <span
                    title={
                      sort[0] === "nickname" && sort[1] === "asc"
                        ? "오름차순"
                        : "내림차순"
                    }
                  >
                    {sort[0] === "nickname" && sort[1] === "desc" ? (
                      <LuChevronDown />
                    ) : (
                      <LuChevronUp />
                    )}
                  </span>
                </th>
                <th
                  className="mypage-block-main-table-head-th"
                  data-key="blockDate"
                  data-value="asc"
                  onClick={(e) => handleSort(e, items, setItems, setSort)}
                >
                  차단 날짜{" "}
                  <span
                    title={
                      sort[0] === "blockDate" && sort[1] === "asc"
                        ? "오름차순"
                        : "내림차순"
                    }
                  >
                    {sort[0] === "blockDate" && sort[1] === "asc" ? (
                      <LuChevronUp />
                    ) : (
                      <LuChevronDown />
                    )}
                  </span>
                </th>
                <th className="mypage-block-main-table-head-th">차단 해제</th>
              </tr>
            </thead>
            <tbody className="mypage-block-main-table-body">
              {items.slice(offset, offset + size).map((item, index) => (
                <tr
                  className="mypage-block-main-table-body-tr"
                  key={item.blockId}
                >
                  <td className="mypage-block-main-table-body-td">
                    {index + 1}
                  </td>
                  <td className="mypage-block-main-table-body-td">
                    {item.nickname}
                  </td>
                  <td className="mypage-block-main-table-body-td">
                    {item.blockDate}
                  </td>
                  <td className="mypage-block-main-table-body-td">
                    <button id={item.blockId}>차단 해제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="mypage-block-search"></section>
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
