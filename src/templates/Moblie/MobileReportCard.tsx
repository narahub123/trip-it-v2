import { convertYYYYMMDDToDate1 } from "utilities/date";
import "./mobileReportCard.css";
import { MobileScheduleCardProps } from "./MobileScheduleCard";
import { convertReportTypeToText } from "./utilities/report";
import { IoIosArrowDropdown } from "react-icons/io";
import { useState } from "react";

const MobileReportCard = ({
  selections,
  setSelections,
  item,
}: MobileScheduleCardProps) => {
  const [detail, setDetail] = useState(false);

  console.log(item.reportType);

  return (
    <li className="mobile-template-card-report">
      <div className="mobile-template-card-report-container">
        <div className="mobile-template-card-report-upper">
          <span className="mobile-template-card-report-info">
            <div className="mobile-template-card-report-info-reportType">
              <button
                className={`mobile-template-card-report-info-reportType-button ${
                  item.reportType.reportReason === "음란"
                    ? "lewd"
                    : item.reportType.reportReason === "폭력"
                    ? "violence"
                    : item.reportType.reportReason === "욕설"
                    ? "abuse"
                    : "etc"
                }`}
              >
                {item.reportType.reportReason}
              </button>
              {item.reportDetail && (
                <span
                  className={`mobile-template-card-report-info-reportType-dropdown${
                    detail ? "-active" : ""
                  }`}
                  onClick={() => setDetail(!detail)}
                >
                  <IoIosArrowDropdown />
                </span>
              )}
            </div>
            <div className="mobile-template-card-report-info-reportId">
              <span>신고글 : </span>
              <span>{item.postId.postId}</span>
            </div>
            <div className="mobile-template-card-report-info-date">
              <span>신고 날짜 : </span>
              <span>{convertYYYYMMDDToDate1(item.reportDate)}</span>
            </div>
          </span>
          <span className="mobile-template-card-report-btn">
            <button>처리중</button>
          </span>
        </div>
        <div
          className={`mobile-template-card-report-lower${
            detail ? "-active" : ""
          }`}
        >
          <div className="mobile-template-card-report-lower-container">
            <p className="title">신고내용</p>
            <p className="detail">{item.reportDetail}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MobileReportCard;
