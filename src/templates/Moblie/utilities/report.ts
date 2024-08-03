export const convertReportTypeToText = (reportType: string) => {
  if (reportType === "R1") {
    return "음란";
  } else if (reportType === "R2") {
    return "폭력";
  } else if (reportType === "R3") {
    return "욕설";
  } else if (reportType === "R4") {
    return "기타";
  }
};
