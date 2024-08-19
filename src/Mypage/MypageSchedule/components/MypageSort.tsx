import "./mypageSort.css";
import React, { useState } from "react";
import { LuArrowDown, LuArrowUp, LuSlidersHorizontal } from "react-icons/lu";
import { mypageScheduleSnSArray } from "../data/schedule";
import { controlSort } from "Mypage/Utilites/mypage";

interface MypageSortProps {
  sort: string[];
  setSort: React.Dispatch<React.SetStateAction<string[]>>;
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const MypageSort = ({ sort, setSort, items, setItems }: MypageSortProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mypage-sort">
      <div className="mypage-sort-title" onClick={() => setOpen(!open)}>
        <LuSlidersHorizontal />
      </div>
      <ul className={`mypage-sort-container${open ? " open" : ""}`}>
        {mypageScheduleSnSArray
          .filter((item) => item.sort.key !== "")
          .map((i) => (
            <li
              key={i.field.name}
              className={`mypage-sort-item${
                sort[0] === i.sort.key ? " active" : ""
              }`}
              data-key={i.sort.key}
              data-value={i.sort.value}
              onClick={(e) =>
                controlSort(e, items, setItems, setSort, open, setOpen)
              }
            >
              <span className="mypage-sort-item-name">{i.title}</span>
              <span className="mypage-sort-item-icon">
                {sort[0] === i.sort.key && sort[1] === "desc" ? (
                  <LuArrowDown />
                ) : (
                  <LuArrowUp />
                )}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MypageSort;
