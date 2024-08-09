import { NavLink } from "react-router-dom";
import "./footer.css";
import {
  LuHome,
  LuClipboardSignature,
  LuUser2,
  LuLogIn,
  LuLogOut,
} from "react-icons/lu";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

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
          to={`/planner`}
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
          to={`/chat`}
          className={({ isActive }) =>
            isActive ? "footer-item active" : "footer-item"
          }
          title="채팅"
        >
          <IoChatbubbleEllipsesOutline />
        </NavLink>
        <NavLink
          to={`/login/normal`}
          className={({ isActive }) =>
            isActive ? "footer-item active" : "footer-item"
          }
          title="로그인"
        >
          {/* <LuLogIn />  */}
          <LuLogOut />
        </NavLink>
      </ul>
    </footer>
  );
};

export default Footer;
