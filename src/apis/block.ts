import axios from "axios";
import { getCookie } from "utilities/Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

// 마이 페이지 차단 목록
export const fetchBlockAPI = async () => {
  try {
    const block = axios.get(`${baseURL}/mypage/block`, {
      headers: {
        "Content-Type": "application/json",
        Access: `${localStorage.getItem("access")}`,
        Refresh: `${getCookie("refresh")}`,
      },
      withCredentials: true,
    });

    return block;
  } catch (error) {
    console.log(error);
  }
};

// 관리자 페이지 차단 목록
export const fetchBlocksAPI = async (
  sortKey?: string,
  sortValue?: string,
  page?: number,
  size?: number,
  search?: string
  // keyword?: string
) => {
  const block = axios.get(
    `${baseURL}/block/all?sortKey=${sortKey}&sortValue=${sortValue}&page=${page}&size=${size}&search=${search}`,
    {
      headers: {
        "Content-Type": "application/json",
        Access: `${localStorage.getItem("access")}`,
        Refresh: `${getCookie("refresh")}`,
      },
      withCredentials: true,
    }
  );

  return block;
};

// 차단 해제
export const unBlockAPI = async (blockId: string | number) => {
  try {
    const response = await axios.post(
      `${baseURL}/block/delete`,
      {
        blockId,
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
