import "./mobilePostCard.css";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { MobileScheduleCardProps } from "./MobileScheduleCard";
import { handleSelect } from "./utilities/schedule";
import { Link } from "react-router-dom";
import { LuCalendarDays, LuPen } from "react-icons/lu";
import { convertYYYYMMDDToDate2 } from "utilities/date";
import { getMetroName } from "utilities/metros";

const MobilePostCard = ({
  selections,
  setSelections,
  item,
}: MobileScheduleCardProps) => {
  return (
    <li className="mobile-template-card-post">
      <div className="mobile-template-card-post-select">
        <p
          onClick={(e) =>
            handleSelect(e, item.scheduleId, selections, setSelections)
          }
        >
          {new Set(selections).has(item.scheduleId) ? (
            <MdOutlineCheckBox />
          ) : (
            <MdOutlineCheckBoxOutlineBlank />
          )}
        </p>
      </div>
      <Link
        to={`/post/${item.postId}`}
        className="mobile-template-card-post-link"
      >
        <div className="mobile-template-card-post-photoarea">
          <img src="/images/defaultImage.jpg" alt="모집글 사진" />
        </div>
        <div className="mobile-template-card-post-textarea">
          <p className="mobile-template-card-post-textarea-title">
            {item.postTitle}
          </p>
          <div className="mobile-template-card-post-textarea-duration">
            <span className="mobile-template-card-post-textarea-duration-icon">
              <LuCalendarDays />
            </span>
            <span className="mobile-template-card-post-textarea-duration-text">
              {/* {`${convertYYYYMMDDToDate2(
                item.startDate
              )}~${convertYYYYMMDDToDate2(item.endDate)}`} */}
            </span>
          </div>
          <div className="mobile-template-card-post-textarea-bottom">
            <div className="mobile-template-card-post-textarea-bottom-postDate">
              <span className="mobile-template-card-post-textarea-bottom-postDate-icon">
                <LuPen />
              </span>
              <span className="mobile-template-card-post-textarea-bottom-postDate-text">
                {convertYYYYMMDDToDate2(item.postDate)}
              </span>
            </div>
            <div className="mobile-template-card-post-textarea-bottom-local">
              {/* {getMetroName(item.metroId)} */}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default MobilePostCard;
