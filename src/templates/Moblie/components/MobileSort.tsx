import { useState } from "react";
import "./mobileSort.css";
import { LuArrowUpDown, LuSlidersHorizontal } from "react-icons/lu";
import { TemplateArrayType } from "types/template";
import { handleSort } from "pages/mypage/utilities/block";

interface MobileSortProps {
  items: any[];
  setItems: (value: any[]) => void;
  sort: string[];
  setSort: (value: string[]) => void;
  tempArray: TemplateArrayType[];
  defaultSort: string[];
}

const MobileSort = ({
  items,
  setItems,
  sort,
  setSort,
  tempArray,
  defaultSort,
}: MobileSortProps) => {
  const [menu, setMenu] = useState(false);

  // esc 키를 누르면 모달창이 닫힘
  window.onkeydown = (e) => {
    if (e.key === "Escape") {
      setMenu(false);
    }
  };

  // 정렬
  const controlSort = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    handleSort(e, items, setItems, setSort);
    setMenu(false);
  };

  return (
    <div className="mobile-template-sort">
      {menu && (
        <div
          className="mobile-template-sort-cover"
          onClick={() => setMenu(false)}
        />
      )}
      <div
        className="mobile-template-sort-title"
        onClick={() => setMenu(!menu)}
      >
        <LuSlidersHorizontal />
      </div>
      <div className={`mobile-template-sort-menu${menu ? " active" : ""}`}>
        <ul className="mobile-template-sort-menu-container">
          {tempArray
            .filter((item) => item.sort.key !== "")
            .map((i) => (
              <li
                className={`mobile-template-sort-menu-item${
                  sort[0] === i.field.name ? " active" : ""
                }`}
                key={i.field.name}
                data-key={i.sort.key}
                data-value={i.sort.value}
                onClick={(e) => controlSort(e)}
              >
                <span>{i.title}</span>
                <span>
                  <LuArrowUpDown />
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileSort;
