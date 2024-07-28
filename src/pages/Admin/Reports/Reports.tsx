import "./reports.css";
import { fetchReportAPI, fetchReportsAPI } from "apis/report";
import { reportsArray } from "templates/data/template";
import Template from "templates/mypage/Template";

const Reports = () => {
  return (
    <Template
      pageName={"block"}
      title={"신고 목록"}
      fetchAPI={fetchReportsAPI}
      defaultSort={["reportDate", "desc"]}
      defaultSize={3}
      defaultField={{ name: "reportType" }}
      tempArray={reportsArray}
    />
  );
};

export default Reports;
