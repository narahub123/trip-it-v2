import { useRenderCount } from "@uidotdev/usehooks";
import Template from "templates/Template";
import "./report.css";
import { fetchReportAPI } from "apis/report";
import { reportArray } from "templates/data/template";

const Report = () => {
  const renderCount = useRenderCount();

  console.log("렌더링 횟수", renderCount);

  return (
    <Template
      pageName={"block"}
      title={"신고 목록"}
      fetchAPI={fetchReportAPI}
      defaultSort={["reportDate", "desc"]}
      defaultSize={3}
      defaultField={{ name: "reportType" }}
      tempArray={reportArray}
    />
  );
};

export default Report;
