import "./mypageSearch.css";
import { debouncedHandleSearchChange } from "Mypage/Utilites/mypage";
import React, { useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";

interface MypageSearchProps {
  setSearch: (value: string) => void; // 검색 상태를 설정하는 함수
  setPage: (value: number) => void; // 페이지 상태를 설정하는 함수
  items: any[]; // 검색할 아이템 목록
  field: { name: string; nested?: string[] }; // 검색할 항목의 필드 이름
  setTotal: (value: number) => void; // 검색 결과의 총 개수를 설정하는 함수
}

const MypageSearch = ({
  setSearch,
  setPage,
  items,
  field,
  setTotal,
}: MypageSearchProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const handleSearchBox = () => {
    setOpen(!open);

    const classname = searchRef.current?.className;

    if (!classname) return;
    !classname.includes("active") && searchRef.current?.focus();
  };
  return (
    <div className="mypage-search">
      <input
        type="text"
        className={`mypage-search-box${open ? " open" : ""}`}
        ref={searchRef}
        placeholder={open ? "검색해주세요" : ""}
        onChange={debouncedHandleSearchChange(
          setSearch,
          setPage,
          items,
          field,
          setTotal
        )}
      />
      <p onClick={() => handleSearchBox()} className="mypage-search-icon">
        <LuSearch />
      </p>
    </div>
  );
};

export default MypageSearch;
