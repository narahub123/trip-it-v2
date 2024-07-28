import "./reports.css";
import { fetchReportsAPI } from "apis/report";
import TemplateA from "templates/admin/TemplateA";
import { reportsArray } from "templates/data/template";

const Reports = () => {
  return (
    <TemplateA
      pageName="reports"
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
