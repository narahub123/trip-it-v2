import { useRef } from "react";
import "./mobileSearch.css";
import { LuSearch } from "react-icons/lu";

interface MobileSearchProps {
  searchBox: boolean;
  setSearchBox: (value: boolean) => void;
}

const MobileSearch = ({ searchBox, setSearchBox }: MobileSearchProps) => {
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
