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

// 차단 추가 하기
export const blockUserAPI = async (value: string) => {
  try {
    const response = await axios.post(
      `${baseURL}/block/add`,
      {
        nickname: value,
        blockedId: value,
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
  } catch (err: any) {
    console.log(err);

    const status = err.response.status;
    const code = err.response.data.code;
    let msgId = 0;

    console.log(status, code);
    if (err.response.data.code === 1) {
      msgId = 1;
    }
    if (err.response.data.code === "1") {
      alert("자기 자신을 차단할 수 없습니다.");
    }
    if (err.response.data.code === "2") {
      alert("이미 차단한 사용자입니다.");
    }

    throw { msgId };
  }
};
