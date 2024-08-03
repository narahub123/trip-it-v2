import { NavLink } from "react-router-dom";
import "./mobileHeader.css";
import { LuCalendar, LuPlane, LuSiren, LuUser2, LuUserX } from "react-icons/lu";

interface MobileHeaderProps {
  list: { title: string; link: string }[];
}
const MobileHeader = ({ list }: MobileHeaderProps) => {
  return (
    <header className="mobile-template-header">
      <ul className="mobile-template-header-container">
        {list.map((item) => (
          <NavLink
            to={item.link}
            className={({ isActive }) =>
              isActive
                ? "mobile-template-header-link active"
                : "mobile-template-header-link"
            }
            key={item.title}
          >
            <li className="mobile-template-header-item">
              {item.title === "개인정보" ? (
                <LuUser2 />
              ) : item.title === "내 일정" ? (
                <LuCalendar />
              ) : item.title === "내 모집글" ? (
                <LuPlane />
              ) : item.title === "차단 목록" ? (
                <LuUserX />
              ) : item.title === "신고 목록" ? (
                <LuSiren />
              ) : (
                ""
              )}
            </li>
          </NavLink>
        ))}
      </ul>
    </header>
  );
};

export default MobileHeader;
