import { LuMoreHorizontal, LuSettings } from "react-icons/lu";
import "./mobileSetting.css";
import { useState } from "react";

const MobileSetting = () => {
  const [menu, setMenu] = useState(false);

  console.log(menu);

  // esc 키를 누르면 모달창이 닫힘
  window.onkeydown = (e) => {
    if (e.key === "Escape") {
      setMenu(false);
    }
  };
  return (
    <div className="mobile-template-setting">
      {menu && (
        <div
          className="mobile-template-setting-cover"
          onClick={() => setMenu(false)}
        />
      )}
      <div
        className="mobile-template-setting-title"
        onClick={() => setMenu(!menu)}
      >
        <LuMoreHorizontal />
      </div>
      <div className={`mobile-template-setting-menu${menu ? " active" : ""}`}>
        <ul className="mobile-template-setting-menu-container">
          <li className="mobile-template-setting-menu-item">adlkjlddfj</li>
        </ul>
      </div>
    </div>
  );
};

export default MobileSetting;
