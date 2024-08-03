import { useRef } from "react";
import "./mobileSearch.css";
import { LuSearch } from "react-icons/lu";
import { TemplateArrayType } from "types/template";
import { debouncedHandleSearchChange } from "pages/Admin/Blocks/utilities/block";

interface MobileSearchProps {
  searchBox: boolean;
  setSearchBox: (value: boolean) => void;
  items: any[];
  field: { name: string; nested?: string[] };
  setField: (value: { name: string; nested?: string[] }) => void;
  setSearch: (value: string) => void;
  setPage: (value: number) => void;
  setTotal: (value: number) => void;
  tempArray: TemplateArrayType[];
  pageName: string;
  search: string;
}

const MobileSearch = ({
  searchBox,
  setSearchBox,
  setField,
  setSearch,
  setPage,
  items,
  field,
  setTotal,
  tempArray,
  pageName,
  search,
}: MobileSearchProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const handleSearchBox = () => {
    setSearchBox(!searchBox);
    console.log(searchRef.current?.style);

    const classname = searchRef.current?.className;

    if (!classname) return;
    !classname.includes("active") && searchRef.current?.focus();
  };

  return (
    <div className="mobile-template-search">
      <input
        type="text"
        className={`mobile-template-search-box${searchBox ? " active" : ""}`}
        ref={searchRef}
        placeholder={searchBox ? "검색해주세요" : ""}
        onChange={debouncedHandleSearchChange(
          setSearch,
          setPage,
          items,
          field,
          setTotal
        )}
      />
      <p
        onClick={() => handleSearchBox()}
        className="mobile-template-search-icon"
      >
        <LuSearch />
      </p>
    </div>
  );
};

export default MobileSearch;
