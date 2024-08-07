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

const Schedule = () => {
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

  const start = convertYYYYMMDDToDateType(startDate);
  const end = convertYYYYMMDDToDateType(endDate);
  const dates = getDateArr(start, end);

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

  useEffect(() => {
    const fetchPlaces = async () => {
      const newColumns: { [key: string]: ColumnType[] } = {};

      for (const detail of scheduleDetails) {
        const contentId = detail.contentId;
        try {
          const res = await fetchPlaceAPI(contentId);
          const dateKey = convertDateTypeToDate2(
            dates[detail.scheduleOrder - 1]
          );

          if (!newColumns[dateKey]) {
            newColumns[dateKey] = [];
          }

          newColumns[dateKey].push({
            place: res.data,
            scheduleOrder: detail.scheduleOrder,
            startTime: detail.startTime,
            endTime: detail.endTime,
          });
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
      <MobileSchedule
        schedule={state}
        scheduleDetails={scheduleDetails}
        dates={dates}
        columns={columns}
        setColumns={setColumns}
      />
      <div className="mypage-footer-blank" />
      <Footer />
    </>
  );
};

export default Schedule;
