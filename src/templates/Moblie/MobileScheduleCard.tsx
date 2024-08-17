import "./mobileScheduleCard.css";
import React from "react";
import { LuCalendarDays, LuPen } from "react-icons/lu";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { convertYYYYMMDDToDate2 } from "utilities/date";
import { getMetroName } from "utilities/metros";
import { convertDataToDate } from "utilities/profile";
import { handleSelect } from "./utilities/schedule";
import { metros } from "data/metros";

export interface MobileScheduleCardProps {
  selections: (string | number)[];
  setSelections: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  item: any;
}

const MobileScheduleCard = ({
  selections,
  setSelections,
  item,
}: MobileScheduleCardProps) => {
  const defaultImage = metros.find(
    (metro) => metro.areaCode === item.metroId
  )?.imgUrl;

  return (
    <li className="mobile-mypapage-template-schedule-card">
      <div className="moblie-mypage-template-item-select">
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
        to={`/mypage/schedules/${item.scheduleId}`}
        state={item}
        className="mobile-mypage-template-link"
      >
        <div className="mobile-mypage-template-item-photoarea">
          <img src={defaultImage} alt="지역사진" />
        </div>
        <div className="mobile-mypage-template-item-textarea">
          <p className="mobile-mypage-template-item-textarea-title">
            {item.scheduleTitle}
          </p>
          <div
            className="mobile-mypage-template-item-textarea-duration"
            title={`${convertDataToDate(item.startDate)}~${convertDataToDate(
              item.endDate
            )}`}
          >
            <span className="mobile-mypage-template-item-textarea-duration-icon">
              <LuCalendarDays />
            </span>
            <span className="mobile-mypage-template-item-textarea-duration-text">
              {`${convertYYYYMMDDToDate2(
                item.startDate
              )}~${convertYYYYMMDDToDate2(item.endDate)}`}
            </span>
          </div>
          <div className="mobile-mypage-template-item-textarea-bottom">
            <div
              className="mobile-mypage-template-item-textarea-regdate"
              title={convertDataToDate(item.registerDate)}
            >
              <span className="mobile-mypage-template-item-textarea-regdate-icon">
                <LuPen />
              </span>
              <span className="mobile-mypage-template-item-textarea-regdate-text">
                {convertYYYYMMDDToDate2(item.registerDate)}
              </span>
            </div>
            <p className="mobile-mypage-template-item-textarea-local">
              {getMetroName(item.metroId)}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default React.memo(MobileScheduleCard, (prevProps, nextProps) => {
  return prevProps === nextProps;
});
