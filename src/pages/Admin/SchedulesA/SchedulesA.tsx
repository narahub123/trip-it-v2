import { deleteSchedulesAAPI, fetchSchedulesAAPI } from "apis/schedule";
import React from "react";
import TemplateA from "templates/admin/TemplateA";
import { schedulesMsgs } from "templates/data/message";
import { scheduleAArray } from "templates/data/template";

const SchedulesA = () => {
  return (
    <TemplateA
      pageName="mypage-schedules"
      title={"일정 목록"}
      fetchAPI={fetchSchedulesAAPI}
      deleteAPI={deleteSchedulesAAPI}
      defaultSort={["registerDate", "desc"]}
      defaultSize={3}
      defaultField={{ name: "registerDate" }}
      tempArray={scheduleAArray}
      msgArray={schedulesMsgs}
      settings={["삭제"]}
    />
  );
};

export default SchedulesA;
