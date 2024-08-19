import "./mypageBlockCard.css";
import { convertYYYYMMDDToDate1 } from "utilities/date";
interface MypageBlockCardProps {
  item: any;
}
const MypageBlockCard = ({ item }: MypageBlockCardProps) => {
  return (
    <li className="mypage-block-card">
      <div className="mypage-block-card-container">
        <span className="mypage-block-card-info">
          <div className="mypage-block-card-info-nickname">{item.nickname}</div>
          <div className="mypage-block-card-info-date">
            <span>차단 날짜 : </span>
            <span>{convertYYYYMMDDToDate1(item.blockDate)}</span>
          </div>
        </span>
        <span className="mypage-block-card-btn">
          <button>차단해제</button>
        </span>
      </div>
    </li>
  );
};

export default MypageBlockCard;
