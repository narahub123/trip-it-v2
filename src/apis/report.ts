import axios from "axios";
import { getCookie } from "utilities/Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

// 신고하기
export const addReportAPI = async (value: any) => {
  try {
    const response = await axios.post(
      `${baseURL}/test/report/add`,
      {
        postId: value.postId,
        reportType: value.reportType,
        reportDetail: value.reportDetail,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Access: `${localStorage.getItem("access")}`,
          Refresh: `${getCookie("refresh")}`,
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

// 마이 페이지 신고 목록
export const fetchReportAPI = async () => {
  try {
    const report = await axios.get(`${baseURL}/mypage/report`, {
      headers: {
        "Content-Type": "application/json",
        Access: `${localStorage.getItem("access")}`,
        Refresh: `${getCookie("refresh")}`,
      },
      withCredentials: true,
    });

    console.log(report);
    return report;
  } catch (error) {
    console.log(error);
  }
};
