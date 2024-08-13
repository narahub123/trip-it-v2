import { useRenderCount } from "@uidotdev/usehooks";
import Template from "templates/mypage/Template";
import "./report.css";
import { fetchReportAPI } from "apis/report";
import { reportArray } from "templates/data/template";
import { reportMsgs } from "templates/data/message";
import MoblieTemplateM from "templates/Moblie/MoblieTemplateM";
import { reportsArray } from "test/data/reports";

const Report = () => {
  const renderCount = useRenderCount();

  console.log("렌더링 횟수", renderCount);

  return (
    <>
      <MoblieTemplateM
        pageName={"mypage-report"}
        title={"신고 목록"}
        fetchAPI={fetchReportAPI}
        defaultSort={["reportDate", "desc"]}
        defaultSize={3}
        defaultField={{
          name: "reportType",
          nested: ["reportType", "reportReason"],
        }}
        tempArray={reportArray}
        msgArray={reportMsgs}
        tempoArray={reportsArray}
      />
      <Template
        pageName={"report"}
        title={"신고 목록"}
        fetchAPI={fetchReportAPI}
        defaultSort={["reportDate", "desc"]}
        defaultSize={3}
        defaultField={{
          name: "reportDate",
        }}
        tempArray={reportArray}
        msgArray={reportMsgs}
      />
    </>
  );
};

export default Report;
