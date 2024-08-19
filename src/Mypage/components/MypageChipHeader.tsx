import "./mypageChipHeader.css";
import { NavLink } from "react-router-dom";

export interface MypageChipHeaderProps {
  list: { title: string; link: string }[];
}

const MypageChipHeader = ({ list }: MypageChipHeaderProps) => {
  return (
    <header className="mypage-header-chip">
      <ul className="mypage-header-chip-container">
        {list.map((item) => (
          <NavLink
            to={item.link}
            className={({ isActive }) =>
              isActive
                ? "mypage-header-chip-item active"
                : "mypage-header-chip-item"
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

export default MypageChipHeader;
