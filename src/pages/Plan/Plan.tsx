import Footer from "templates/Moblie/components/Footer";
import "./plan.css";
import { metros } from "data/metros";
import { useEffect, useRef, useState } from "react";

const Plan = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);

  const checkFocus = () => {
    if (inputRef.current) {
      setFocus(document.activeElement === inputRef.current);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.currentTarget.value;

    setSearch(search);
  };

  console.log(focus);

  return (
    <div className="plan">
      <section className="plan-title">
        <h3>지역 검색</h3>
      </section>
      <section className="plan-search">
        <input
          type="text"
          className="plan-search-box"
          placeholder={focus ? "" : "#지역 검색"}
          ref={inputRef}
          onChange={(e) => handleSearch(e)}
          onFocus={checkFocus}
          onBlur={checkFocus}
        />
      </section>
      <section className="plan-grid">
        <ul className="plan-grid-container">
          {metros
            .filter((item) => item.name.includes(search))
            .map((metro) => (
              <li className="plan-grid-item" key={metro.areaCode}>
                <img src={metro.imgUrl} alt="" />
                <div className="plan-grid-item-title">{metro.name}</div>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
};

export default Plan;
