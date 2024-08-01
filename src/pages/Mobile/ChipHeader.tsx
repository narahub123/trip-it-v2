import "./chipHeader.css";
import { NavLink } from "react-router-dom";

export interface ChipHeaderProps {
  list: { title: string; link: string }[];
}

const ChipHeader = ({ list }: ChipHeaderProps) => {
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

export default ChipHeader;
