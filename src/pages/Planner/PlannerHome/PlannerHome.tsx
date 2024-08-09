import "./plannerHome.css";
import { useState } from "react";
import { MessageType } from "types/template";
import PlannerHomeModal from "./PlannerHomeModal";
import { metros } from "data/metros";

const PlannerHome = () => {
  const [message, setMessage] = useState<MessageType>();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.currentTarget.value;

    setSearch(search);
  };

  const showDetail = (areaCode: string) => {
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
    <div className="planner-home">
      {message && (
        <PlannerHomeModal message={message} setMessage={setMessage} />
      )}
      <section className="planner-home-title">
        <h3>지역 검색</h3>
      </section>
      <section className="planner-home-search">
        <input
          type="text"
          className="planner-home-search-box"
          onChange={(e) => handleSearch(e)}
        />
      </section>
      <section className="planner-home-grid">
        <ul className="planner-home-grid-container">
          {metros
            .filter((item) => item.name.includes(search))
            .map((metro) => (
              <li
                key={metro.areaCode}
                className="planner-home-grid-item"
                onClick={() => showDetail(metro.areaCode)}
              >
                <img
                  src={metro.imgUrl}
                  alt="지역 사진"
                  className="planner-home-grid-item-image"
                />
                <p className="planner-home-grid-item-title">{metro.name}</p>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
};

export default PlannerHome;
