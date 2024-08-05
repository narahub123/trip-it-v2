import { useNavigate } from "react-router-dom";
import "./planPlaces.css";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";

const PlanPlaces = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState("place");
  return (
    <div className="plan-places">
      <section className="plan-places-info">
        <h3 className="plan-placesd-info-title">장소</h3>
        <div className="plan-places-info-detail">
          <div>지역</div>
          <div>날짜</div>
        </div>
      </section>
      <section className="plan-places-btns">
        <button
          className="plan-places-btns before"
          onClick={() => navigate(-1)}
        >
          <LuChevronLeft />
          이전
        </button>
        <button
          className="plan-places-btns next"
          onClick={() => navigate(`#accomm`)}
        >
          다음
          <LuChevronRight />
        </button>
      </section>
      <section
        className={`plan-places-main place ${open === "place" ? "active" : ""}`}
        onClick={() => setOpen("place")}
      >
        <div className="plan-places-main-title">
          <p>외부 api 장소</p>
          <span className="plan-places-main-title-icon">
            <IoIosArrowDropup />
          </span>
        </div>

        <ul className="plan-places-main-container">
          <div className="plan-places-main-tags">
            <span className="plac-places-main-tags-item tour">관광</span>
            <span className="plac-places-main-tags-item culture">문화</span>
            <span className="plac-places-main-tags-item food">음식</span>
          </div>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
        </ul>
      </section>
      <section
        className={`plan-places-main accomm ${
          open === "accomm" ? "active" : ""
        }`}
        onClick={() => setOpen("accomm")}
      >
        <div className="plan-places-main-title">
          <p>외부 api 숙소</p>
          <span className="plan-places-main-title-icon">
            <IoIosArrowDropup />
          </span>
        </div>
        <ul className="plan-places-main-container">
          <div className="plan-places-main-tags">
            <span className="plac-places-main-tags-item sleep">숙소</span>
          </div>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
        </ul>
      </section>
      <section
        className={`plan-places-main selected ${
          open === "selected" ? "active" : ""
        }`}
        onClick={() => setOpen("selected")}
      >
        <div className="plan-places-main-title">
          <p>선택한 장소</p>
          <span className="plan-places-main-title-icon">
            <IoIosArrowDropup />
          </span>
        </div>
        <ul className="plan-places-main-container">
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
          <li>하이</li>
        </ul>
      </section>
    </div>
  );
};

export default PlanPlaces;
