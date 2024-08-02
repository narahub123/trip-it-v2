import { deleteSchedulesMAPI, fetchSchedulesMAPI } from "apis/schedule";
import React from "react";
import { schedulesMsgs } from "templates/data/message";
import { scheduleMArray } from "templates/data/template";
import MoblieTemplateM from "templates/Moblie/MoblieTemplateM";
import Template from "templates/mypage/Template";

const SchedulesM = () => {
  return (
    <>
      <MoblieTemplateM
        pageName="mypage-schedules"
        title={"일정 목록"}
        fetchAPI={fetchSchedulesMAPI}
        deleteAPI={deleteSchedulesMAPI}
        defaultSort={["registerDate", "desc"]}
        defaultSize={3}
        defaultField={{ name: "registerDate" }}
        tempArray={scheduleMArray}
        msgArray={schedulesMsgs}
      />
      <Template
        pageName="mypage-schedules"
        title={"일정 목록"}
        fetchAPI={fetchSchedulesMAPI}
        deleteAPI={deleteSchedulesMAPI}
        defaultSort={["registerDate", "desc"]}
        defaultSize={3}
        defaultField={{ name: "registerDate" }}
        tempArray={scheduleMArray}
        msgArray={schedulesMsgs}
        settings={["삭제"]}
      />
    </>
  );
};

export default SchedulesM;
