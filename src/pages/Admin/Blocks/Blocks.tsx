import "./blocks.css";
import { fetchBlocksAPI } from "apis/block";
import { blockArray } from "pages/mypage/block/test";
import React, { useEffect, useState } from "react";
import Template from "templates/Template";
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronRight,
} from "react-icons/fi";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { debounce } from "utilities/debounce";
import { debouncedHandleSizeChange, handleSort } from "./utils/block";

// 관리자 페이지 차단
const Blocks = () => {
  const [items, setItems] = useState<any[]>(blockArray); // 차단 목록 상태
  const [sort, setSort] = useState<string[]>(["blockDate", "desc"]); // 정렬 상태
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [search, setSearch] = useState("");

  // 전체 페이지
  const numPages = Math.ceil(totalElements / size);

  // 차단 목록 불러오기
  useEffect(() => {
    const sortKey = sort[0];
    const sortValue = sort[1];
    fetchBlocksAPI(sortKey, sortValue, page, size, search)
      .then((res) => {
        console.log(res?.data);

        const blocks = res?.data.content;
        const total = res.data.totalElements;
        setItems(blocks);
        setTotalElements(total);
      })
      .catch((err) => console.log(err));
  }, [page, size, sort, search]);

  // 검색
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    console.log(value);

    setSearch(value);
  };

  const debouncedHandleSearchChange = debounce<typeof handleSearchChange>(
    handleSearchChange,
    500
  );

  return (
    <>
      {/* <Template pageName="admin-blocks" /> */}
      <div className="admin-blocks">
        <section className="admin-blocks-title">
          <h3>내 차단 목록 </h3>
        </section>
        <section className="admin-blocks-panels">
          <div className="admin-blocks-panels-sizeController">
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              onChange={debouncedHandleSizeChange(setSize)}
            />
            <span>{size}</span>
          </div>
        </section>
        <section className="admin-blocks-main">
          <table className="admin-blocks-main-table">
            <thead className="admin-blocks-main-table-head">
              <tr className="admin-blocks-main-table-head-tr">
                <th className="admin-blocks-main-table-head-th">번호</th>
                <th
                  className="admin-blocks-main-table-head-th"
                  data-key="userId.nickname"
                  data-value="desc"
                  onClick={(e) => handleSort(e, setSort)}
                >
                  차단한 유저{" "}
                  <span>
                    {sort[0] === "userId.nickname" && sort[1] === "asc" ? (
                      <LuChevronUp />
                    ) : (
                      <LuChevronDown />
                    )}
                  </span>
                </th>
                <th
                  className="admin-blocks-main-table-head-th"
                  data-key="nickname"
                  data-value="desc"
                  onClick={(e) => handleSort(e, setSort)}
                >
                  차단 당한 유저{" "}
                  <span>
                    {sort[0] === "nickname" && sort[1] === "asc" ? (
                      <LuChevronUp />
                    ) : (
                      <LuChevronDown />
                    )}
                  </span>
                </th>
                <th
                  className="admin-blocks-main-table-head-th"
                  data-key="blockDate"
                  data-value="desc"
                  onClick={(e) => handleSort(e, setSort)}
                >
                  차단 날짜{" "}
                  <span>
                    {sort[0] === "blockDate" && sort[1] === "asc" ? (
                      <LuChevronUp />
                    ) : (
                      <LuChevronDown />
                    )}
                  </span>
                </th>
                <th className="admin-blocks-main-table-head-th">차단 해제</th>
              </tr>
            </thead>
            <tbody className="admin-blocks-main-table-body">
              {items.map((item, index) => (
                <tr
                  className="admin-blocks-main-table-body-tr"
                  key={item.blockId}
                >
                  <td className="admin-blocks-main-table-body-td">
                    {index + 1}
                  </td>
                  <td className="admin-blocks-main-table-body-td">
                    {item.userId.nickname}
                  </td>
                  <td className="admin-blocks-main-table-body-td">
                    {item.nickname}
                  </td>
                  <td className="admin-blocks-main-table-body-td">
                    {item.blockDate}
                  </td>
                  <td className="admin-blocks-main-table-body-td">
                    <button id={item.blockId}>차단 해제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="admin-blocks-search">
          <input type="text" onChange={debouncedHandleSearchChange} />
        </section>
        <section className="admin-blocks-pagination">
          <nav className="test-pagination">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="test-pageController"
            >
              <FiChevronsLeft />
            </button>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="test-pageController"
            >
              <FiChevronLeft />
            </button>
            {Array(numPages)
              .fill("_")
              .map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={
                    page === i + 1 ? "test-pageNum active" : "test-pageNum"
                  }
                >
                  {i + 1}
                </button>
              ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === numPages}
              className="test-pageController"
            >
              <FiChevronRight />
            </button>
            <button
              onClick={() => setPage(numPages)}
              disabled={page === numPages}
              className="test-pageController"
            >
              <FiChevronsRight />
            </button>
          </nav>
        </section>
      </div>
    </>
  );
};

export default Blocks;
