import "./planHome.css";
import { metros } from "data/metros";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileModal from "templates/Moblie/components/MobileModal";
import MobilePlanHomeModal from "templates/Moblie/components/MobilePlanHomeModal";
import { MessageType } from "types/template";

const PlanHome = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<MessageType>();
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

  const showDetail = (areaCode: string) => {
    console.log(areaCode);
    const metro = metros.find((item) => item.areaCode === areaCode);

    if (!metro) return;
    setMessage({
      msgId: 3,
      type: "move",
      msgs: {
        header: metro.name,
        main: metro.description,
      },
      params: areaCode,
    });
  };

  // 모달창이 열리면 스크롤이 안되게 조정
  if (message) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <div className="plan-home">
      {message && (
        <MobilePlanHomeModal message={message} setMessage={setMessage} />
      )}
      <section className="plan-home-title">
        <h3>지역 검색</h3>
      </section>
      <section className="plan-home-search">
        <input
          type="text"
          className="plan-home-search-box"
          placeholder={focus ? "" : "#지역 검색"}
          ref={inputRef}
          onChange={(e) => handleSearch(e)}
          onFocus={checkFocus}
          onBlur={checkFocus}
        />
      </section>
      <section className="plan-home-grid">
        <ul className="plan-home-grid-container">
          {metros
            .filter((item) => item.name.includes(search))
            .map((metro) => (
              <li
                className="plan-home-grid-item"
                key={metro.areaCode}
                onClick={() => showDetail(metro.areaCode)}
              >
                <img src={metro.imgUrl} alt="" />
                <div className="plan-home-grid-item-title">{metro.name}</div>
              </li>
            ))}
        </ul>
      </section>
      <section className="plan-home-bottom" />
    </div>
  );
};

export default PlanHome;
