import { NavLink } from "react-router-dom";
import "./footer.css";
import {
  LuHome,
  LuClipboardSignature,
  LuUser2,
  LuLogIn,
  LuLogOut,
} from "react-icons/lu";
const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footer-container">
        <NavLink
          to={`/post`}
          className={({ isActive }) =>
            isActive ? "footer-item active" : "footer-item"
          }
          title="홈"
        >
          <LuHome />
        </NavLink>
        <NavLink
          to={`/schedule`}
          className={({ isActive }) =>
            isActive ? "footer-item active" : "footer-item"
          }
          title="플레너"
        >
          <LuClipboardSignature />
        </NavLink>
        <NavLink
          to={`/mypage`}
          className={({ isActive }) =>
            isActive ? "footer-item active" : "footer-item"
          }
          title="마이페이지"
        >
          <LuUser2 />
        </NavLink>
        <NavLink
          to={`/logout`}
          className={({ isActive }) =>
            isActive ? "footer-item active" : "footer-item"
          }
          title="로그아웃"
        >
          {/* <LuLogIn />  */}
          <LuLogOut />
        </NavLink>
      </ul>
    </footer>
  );
};

export default Footer;
