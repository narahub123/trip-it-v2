import React, { useEffect, useState } from "react";
import MobileSchedule from "./MobileSchedule";
import Footer from "templates/Moblie/components/Footer";
import { fetchScheduleDetails } from "apis/schedule";
import { useLocation } from "react-router-dom";
import { ScheduleDetailType } from "types/schedule";
import {
  convertDateTypeToDate2,
  convertYYYYMMDDToDateType,
  getDateArr,
} from "utilities/date";
import { fetchPlaceAPI } from "apis/place";
import { ColumnType } from "types/plan";
import ScheduleMobile from "./Mobile/ScheduleMobile";
import { MessageType } from "types/template";

const Schedule = () => {
  const { hash, pathname } = useLocation();
  const [message, setMessage] = useState<MessageType>();
  const { state } = useLocation();
  const [scheduleDetails, setScheduleDetails] = useState<ScheduleDetailType[]>(
    []
  );
  const [columns, setColumns] = useState<{ [key: string]: ColumnType[] }>({});

  const {
    scheduleId,
    scheduleTitle,
    startDate,
    endDate,
    metroId,
    registerDate,
  } = state;

  const [title, setTitle] = useState(scheduleTitle);

  console.log(startDate, endDate);

  const start = convertYYYYMMDDToDateType(startDate);
  const end = convertYYYYMMDDToDateType(endDate);

  console.log(start, end);

  const [dates, setDates] = useState(getDateArr(start, end));
  // 일정 상세 받기
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetchScheduleDetails(scheduleId);
        if (res) {
          setScheduleDetails(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [scheduleId]);

  console.log(scheduleDetails);

  // 일정 상세를 통해서 공공 데이터에서 장소 정보 받아오기
  useEffect(() => {
    const fetchPlaces = async () => {
      const newColumns: { [key: string]: ColumnType[] } = {};

      for (const detail of scheduleDetails) {
        const contentId = detail.contentId;
        try {
          const res = await fetchPlaceAPI(contentId);
          const dateKey = convertDateTypeToDate2(dates[detail.scheduleOrder]);

          if (!newColumns[dateKey]) {
            newColumns[dateKey] = [];
          }

          const place = res.data[0];

          newColumns[dateKey].push({
            place,
            scheduleOrder: detail.scheduleOrder,
            startTime: detail.startTime,
            endTime: detail.endTime,
          });

          console.log("여기", newColumns);
        } catch (err: any) {
          console.error(err);
          if (err.code === 6) {
            alert("데이터 소진");
            break;
          }
        }
      }

      setColumns(newColumns);
    };

    if (scheduleDetails.length > 0) {
      fetchPlaces();
    }
  }, [scheduleDetails]);

  console.log(columns);

  return (
    <>
      {message ? <div className="planner-modal"></div> : undefined}

      <ScheduleMobile
        title={title}
        setTitle={setTitle}
        metroId={metroId}
        dates={dates}
        setDates={setDates}
        columns={columns}
        setColumns={setColumns}
        registerDate={registerDate}
        schedule={state}
        scheduleDetails={scheduleDetails}
      />

      <div className="mypage-footer-blank" />
      <Footer />
    </>
  );
};

export default Schedule;
