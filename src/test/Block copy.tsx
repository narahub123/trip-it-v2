import { useRenderCount } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import Template from "templates/mypage/Template";
import "./block.css";
import { blockArray } from "../pages/mypage/Block/test";
import { fetchBlockAPI } from "apis/block";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import {
  handleFieldChange,
  handleSort,
  handleUnblock,
} from "../pages/mypage/utilities/block";
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronRight,
} from "react-icons/fi";
import {
  debouncedHandleSearchChange,
  debouncedHandleSizeChange,
} from "pages/Admin/Blocks/utilities/block";
import { convertYYYYMMDDToDate1 } from "utilities/date";
import { MessageType } from "types/template";

const Block = () => {
  const renderCount = useRenderCount();
  const [items, setItems] = useState<any[]>([]); // 차단 목록 상태
  const [sort, setSort] = useState<string[]>(["blockDate", "desc"]); // 정렬 상태
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);
  const [search, setSearch] = useState("");
  const [field, setField] = useState({ name: "nickname" });
  const [total, setTotal] = useState(1);
  const [message, setMessage] = useState<MessageType>();
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
              {items
                .filter((item) => item[field.name].includes(search))
                .slice(offset, offset + size)
                .map((item, index) => (
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
                      {convertYYYYMMDDToDate1(item.blockDate)}
                    </td>
                    <td className="mypage-block-main-table-body-td">
                      <button
                        id={item.blockId}
                        data-nickname={item.nickname}
                        onClick={(e) =>
                          handleUnblock(
                            e,
                            items,
                            setItems,
                            setMessage,
                            item.blockId
                          )
                        }
                      >
                        차단 해제
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
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
