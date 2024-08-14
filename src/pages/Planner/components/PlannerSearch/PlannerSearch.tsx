import "./plannerSearch.css";
import React from "react";
import { LuSearch } from "react-icons/lu";
export interface PlannerSearchProps {
  openSearch: boolean;
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenSearch: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}
const PlannerSearch = ({
  openSearch,
  search,
  onChange,
  handleOpenSearch,
}: PlannerSearchProps) => {
  return (
    <span
      className={`planner-search${openSearch ? " active" : ""}`}
      onClick={(e) => handleOpenSearch(e)}
    >
      <input
        type="text"
        className={`planner-search-box${openSearch ? " active" : ""}`}
        onClick={(e) => e.stopPropagation()}
        onChange={onChange}
        value={search}
        placeholder="검색어를 입력하세요."
      />
      <span className="planner-search-icon">
        <LuSearch />
      </span>
    </span>
  );
};

export default PlannerSearch;
