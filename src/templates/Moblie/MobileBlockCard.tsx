import { convertYYYYMMDDToDate1, convertYYYYMMDDToDate2 } from "utilities/date";
import "./mobileBlockCard.css";
import { MobileScheduleCardProps } from "./MobileScheduleCard";

const MobileBlockCard = ({
  selections,
  setSelections,
  item,
}: MobileScheduleCardProps) => {
  return (
    <li className="mobile-template-card-block">
      <div className="mobile-template-card-block-container">
        <span className="mobile-template-card-block-info">
          <div className="mobile-template-card-block-info-nickname">
            {item.nickname}
          </div>
          <div className="mobile-template-card-block-info-date">
            <span>차단 날짜 : </span>
            <span>{convertYYYYMMDDToDate1(item.blockDate)}</span>
          </div>
        </span>
        <span className="mobile-template-card-block-btn">
          <button>차단해제</button>
        </span>
      </div>
    </li>
  );
};

export default MobileBlockCard;
