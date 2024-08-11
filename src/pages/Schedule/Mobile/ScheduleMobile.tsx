import PlannerInfoAccordian from "pages/Planner/PlannerPlace/PlannerAccordians/PlannerInfoAccordian";
import "./scheduleMobile.css";
import { useEffect, useState } from "react";
import PlannerDateAccordian from "pages/Planner/PlannerPlace/PlannerAccordians/PlannerDateAccordian";
import { convertDateToYYYYMMDD, convertDateTypeToDate2 } from "utilities/date";
import { ColumnType, ScheduleDetailDtoInputType } from "types/plan";
import { plannerAPIAccordianArr } from "pages/Planner/data/plannerPlace";
import PlannerAPIAccordian from "pages/Planner/PlannerPlace/PlannerAccordians/PlannerAPIAccordian";
import { useNavigate } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";
import Calendar from "pages/Plan/components/Calendar";
import PlannerCalendarAccordian from "pages/Planner/PlannerPlace/PlannerAccordians/PlannerCalendarAccordian";
export interface ScheduleMobileProps {
  title: string;
  setTitle: (value: string) => void;
  metroId: string;
  dates: Date[];
  setDates: (value: Date[]) => void;
  columns: { [key: string]: ColumnType[] };
  setColumns: React.Dispatch<
    React.SetStateAction<{
      [key: string]: ColumnType[];
    }>
  >;
}
const ScheduleMobile = ({
  title,
  setTitle,
  metroId,
  dates,
  setDates,
  columns,
  setColumns,
}: ScheduleMobileProps) => {
  const navigate = useNavigate();
  const [openAccordian, setOpenAccordian] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [valid, setValid] = useState(false);
  const [contentTypeId, setContentTypeId] = useState("");

  useEffect(() => {
    // 각 컬럼에 적어도 숙소 한 곳, 관광지 한 곳 이상이 있어야 함
    dates.forEach((date) => {
      console.log(columns);

      const column = columns[convertDateTypeToDate2(date)] || [];

      // 관광지 개수
      const countOfPlaces = column.filter(
        (item) => item.place.contenttypeid !== "32"
      ).length;
      // 숙소 개수
      const countOfAccomm = column.filter(
        (item) => item.place.contenttypeid === "32"
      ).length;

      if (countOfPlaces < 1 || countOfAccomm < 1) {
        return setValid(false);
      } else {
        // 모든 컬럼에 결격 사유가 없는 경우
        setValid(true);
      }
    });
  }, [columns]);

  // 아코디언 여닫기 함수
  const handleOpenAccordian = (
    accordianName: string,
    contentTypeId?: string
  ) => {
    if (accordianName === openAccordian) {
      return setOpenAccordian("");
    }

    setOpenAccordian(accordianName);
    if (!contentTypeId) return;
    setContentTypeId(contentTypeId);
  };

  // 제출하기
  const handleUpdate = () => {
    if (!title) return window.alert("일정 제목을 적어주세요");
    const start = convertDateToYYYYMMDD(dates[0]);
    const end = convertDateToYYYYMMDD(dates[dates.length - 1]);

    setIsSubmitting(true);

    const scheduleDetails: ScheduleDetailDtoInputType[] = [];
    const values = Object.values(columns);
    console.log(values);
    for (let i = 0; i < values.length; i++) {
      const column = values[i];
      for (const detail of column) {
        const newDetail: ScheduleDetailDtoInputType = {
          contentId: detail.place.contentid,
          scheduleOrder: detail.scheduleOrder,
          startTime: detail.startTime,
          endTime: detail.endTime,
        };
        scheduleDetails.push(newDetail);
      }
    }

    const submitValue = {
      scheduleDto: {
        metroId: metroId,
        startDate: start,
        endDate: end,
        scheduleTitle: title,
      },
      detailScheduleDto: scheduleDetails,
    };

    console.log(submitValue);
    setIsSubmitting(false);

    // 수정 api 필요
    // saveScheduleAPI(submitValue)
    //   .then((res) => {
    //     console.log(res.data);
    //     if (!res) return;

    //     if (res.status === 200) {
    //       setIsSubmitting(false);
    //       console.log("수정 성공");
    //       navigate("/mypage/schedules");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsSubmitting(false);
    //   });
  };

  const year = dates[0].getFullYear();
  const month = dates[0].getMonth();

  return (
    <div className="schedule-mobile">
      <section className="schedule-mobile-title">
        <h3>일정</h3>
      </section>
      <PlannerInfoAccordian
        title={title}
        setTitle={setTitle}
        openAccordian={openAccordian}
        handleOpenAccordian={handleOpenAccordian}
        metroId={metroId}
        dates={dates}
      />

      <PlannerCalendarAccordian
        openAccordian={openAccordian}
        handleOpenAccordian={handleOpenAccordian}
        dates={dates}
        setDates={setDates}
      />

      {openCalendar && (
        <section className="schedule-mobile-calendar-accordian">
          <Calendar
            year={year}
            month={month}
            dates={dates}
            setDates={setDates}
          />
        </section>
      )}
      {dates.map((date) => (
        <PlannerDateAccordian
          metroId={metroId}
          openAccordian={openAccordian}
          handleOpenAccordian={handleOpenAccordian}
          date={date}
          dates={dates}
          key={convertDateTypeToDate2(date)}
          columns={columns}
          setColumns={setColumns}
        />
      ))}
      {plannerAPIAccordianArr.map((apiInfo) => (
        <PlannerAPIAccordian
          key={apiInfo.key}
          dates={dates}
          metroId={metroId}
          openAccordian={openAccordian}
          handleOpenAccordian={handleOpenAccordian}
          apiInfo={apiInfo}
          columns={columns}
          setColumns={setColumns}
          contentTypeId={contentTypeId}
          setContentTypeId={setContentTypeId}
        />
      ))}
      <section className="schedule-mobile-btns">
        <button className="schedule-mobile-btns-btn backward">날짜</button>
        <button
          className={`schedule-mobile-btns-btn${
            isSubmitting ? " submitting" : title && valid ? " update" : ""
          }`}
          onClick={isSubmitting ? undefined : () => handleUpdate()}
        >
          {isSubmitting ? (
            <p>
              <LuLoader2 />
            </p>
          ) : (
            <p>수정</p>
          )}
        </button>
      </section>
    </div>
  );
};

export default ScheduleMobile;
