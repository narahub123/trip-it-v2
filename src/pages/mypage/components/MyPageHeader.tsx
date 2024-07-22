import { Link } from "react-router-dom";
import "./mypageHeader.css";
import { NavLink } from "react-router-dom";

const MyPageHeader = () => {
  const mypageList = [
    { title: "개인정보", link: "./profile" },
    { title: "내 일정", link: "./schedules" },
    { title: "내 모집글", link: "./posts" },
    { title: "차단 목록", link: "./blocks" },
    { title: "신고 목록", link: "./reports" },
  ];

  return (
    <header className="mypage-header">
      <ul className="mypage-header-container">
        {mypageList.map((item) => (
          <NavLink
            to={item.link}
            className={({ isActive }) =>
              isActive ? "mypage-header-item active" : "mypage-header-item"
            }
            key={item.title}
          >
            {item.title}
          </NavLink>
        ))}
      </ul>
    </header>
  );
};

export default MyPageHeader;
