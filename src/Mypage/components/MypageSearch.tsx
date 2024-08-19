import "./mypageSearch.css";
import {
  debouncedHandleSearchChange,
  handleField,
  handleSearch,
} from "Mypage/Utilites/mypage";
import React, { useRef, useState } from "react";
import { TemplateArrayType } from "types/template";

interface MypageSearchProps {
  sortNSearchArray: TemplateArrayType[];
  search: string;
  setSearch: (value: string) => void; // 검색 상태를 설정하는 함수
  setPage: (value: number) => void; // 페이지 상태를 설정하는 함수
  items: any[]; // 검색할 아이템 목록
  field: { name: string; nested?: string[] }; // 검색할 항목의 필드 이름
  setField: (value: { name: string; nested?: string[] }) => void;
  setTotal: (value: number) => void; // 검색 결과의 총 개수를 설정하는 함수
}

const MypageSearch = ({
  sortNSearchArray,
  search,
  setSearch,
  setPage,
  items,
  field,
  setField,
  setTotal,
}: MypageSearchProps) => {
  const [open, setOpen] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);

  const type = sortNSearchArray.find((item) => item.field.name === field.name)
    ?.search?.type;
  // tempArray에서 field.name과 일치하는 항목을 찾고, 해당 항목의 search.enum을 가져옵니다.
  const option = sortNSearchArray.find((item) => item.field.name === field.name)
    ?.search.enum;

  let options;
  // option이 undefined가 아닐 경우에만 Object.entries를 사용합니다.
  if (option) {
    options = Object.entries(option);
  }
  return (
    <div className="mypage-search">
      <span className="mypage-search-field">
        <div
          className={`mypage-search-field-title${open ? " open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          {
            sortNSearchArray.find((item) => item.field.name === field.name)
              ?.title
          }
        </div>
        <ul className={`mypage-search-field-container${open ? " open" : ""}`}>
          {sortNSearchArray
            .filter((item) => item.search.able === true)
            .map((item, i) => (
              <li
                className={`mypage-search-field-item${
                  field === item.field ? " active" : ""
                }`}
                key={i}
                value={item.field.name}
                onClick={() =>
                  handleField(item.field, setField, setSearch, setOpen)
                }
              >
                {item.title}
              </li>
            ))}
        </ul>
      </span>
      {type === "normal" && (
        <span className="mypage-search-keyword">
          <input
            type="text"
            onChange={debouncedHandleSearchChange(
              setSearch,
              setPage,
              items,
              field,
              setTotal
            )}
            className="mypage-search-keyword-box"
          />
        </span>
      )}
      {type === "select" && (
        <span
          onClick={() => setOpenSelect(!openSelect)}
          className="mypage-search-keyword"
        >
          <p>{search.length === 0 ? "선택해주세요" : search}</p>
          <ul className={openSelect ? "active" : undefined}>
            <li onClick={() => setSearch("")}>전체</li>
            {options?.map((option) => (
              <li
                key={option[0]}
                onClick={() => handleSearch(option[0], option[1], setSearch)}
              >
                {option[1]}
              </li>
            ))}
          </ul>
        </span>
      )}
    </div>
  );
};

export default MypageSearch;
