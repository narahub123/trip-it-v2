import { Link } from "react-router-dom";
import "./mypageHeader.css";
import { NavLink } from "react-router-dom";

export interface MyPageHeaderProps {
  list: any[];
}

const MyPageHeader = ({ list }: MyPageHeaderProps) => {
  return (
    <header className="mypage-header">
      <ul className="mypage-header-container">
        {list.map((item) => (
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
