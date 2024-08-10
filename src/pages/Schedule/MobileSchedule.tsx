import { IoIosArrowDropup } from "react-icons/io";
import "./mobileSchedule.css";
import { ScheduleDetailType, ScheduleType } from "types/schedule";
import { convertDateTypeToDate2, convertYYYYMMDDToDate1 } from "utilities/date";
import { useState } from "react";
import PlanColumnCard from "pages/Plan/PlanColumnCard";
import { ColumnType } from "types/plan";

export interface MobileScheduleProps {
  schedule: ScheduleType;
  dates: Date[];
  scheduleDetails: ScheduleDetailType[];
  columns: { [key: string]: ColumnType[] };
  setColumns: (value: { [key: string]: ColumnType[] }) => void;
}

const MobileSchedule = ({
  schedule,
  dates,
  scheduleDetails,
  columns,
  setColumns,
}: MobileScheduleProps) => {
  const [openAccordian, setOpenAccordian] = useState("");
  const {
    scheduleId,
    scheduleTitle,
    startDate,
    endDate,
    metroId,
    registerDate,
    userId: { userId, nickname },
  } = schedule;

  return (
    <div className="mobile-schedule">
      <section className="mobile-schedule-title">
        <h3>일정</h3>
      </section>
      <header className="mobile-schedule-header">
        <section
          className="mobile-schedule-accordian"
          onClick={
            openAccordian === scheduleTitle
              ? () => setOpenAccordian("")
              : () => setOpenAccordian(scheduleTitle)
          }
        >
          <div className="mobile-schedule-accordian-title">
            <p>
              {scheduleTitle} <span></span>
            </p>
            <span
              className={`mobile-schedule-accordian-title-icon ${
                openAccordian === scheduleTitle ? "active" : ""
              }`}
            >
              <IoIosArrowDropup />
            </span>
          </div>
          <div
            className={`mobile-schedule-accordian-container ${
              openAccordian === scheduleTitle ? "active" : ""
            }`}
          >
            <div className="mobile-schedule-accordian-info duration">
              <span className="mobile-schedule-accordian-info name">기간</span>
              <span>
                {convertYYYYMMDDToDate1(startDate)} -{" "}
                {convertYYYYMMDDToDate1(endDate)}
              </span>
            </div>
            <div className="mobile-schedule-accordian-info regDate">
              <span className="mobile-schedule-accordian-info name">
                등록일
              </span>
              <span>{convertYYYYMMDDToDate1(registerDate)}</span>
            </div>
            <div className="mobile-schedule-accordian-info user">
              <span className="mobile-schedule-accordian-info name">회원</span>
              <span>{nickname}</span>
            </div>
          </div>
        </section>
      </header>

      <main className="mobile-schedule-main">
        {dates.map((date, index) => {
          const columnArr = columns[convertDateTypeToDate2(date)];
          return (
            <section
              className="mobile-schedule-accordian"
              key={date.toDateString()}
              onClick={
                openAccordian === convertDateTypeToDate2(date)
                  ? () => setOpenAccordian("")
                  : () => setOpenAccordian(convertDateTypeToDate2(date))
              }
            >
              <div className="mobile-schedule-accordian-title">
                <p>
                  {convertDateTypeToDate2(date)} <span>장소 : 숙소 :</span>
                </p>
                <span
                  className={`mobile-schedule-accordian-title-icon ${
                    openAccordian === convertDateTypeToDate2(date)
                      ? "active"
                      : ""
                  }`}
                >
                  <IoIosArrowDropup />
                </span>
              </div>

              <ul
                className={`mobile-schedule-accordian-container ${
                  openAccordian === convertDateTypeToDate2(date) ? "active" : ""
                }`}
              >
                {columnArr
                  ?.filter((d) => d.scheduleOrder === index + 1)
                  .map((detail, order) => {
                    return (
                      <PlanColumnCard
                        key={order}
                        order={order}
                        metroId={metroId}
                        date={date}
                        dates={dates}
                        detail={detail}
                        columns={columns}
                        setColumns={setColumns}
                        setOpenAccordian={setOpenAccordian}
                      />
                    );
                  })}
              </ul>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default MobileSchedule;
