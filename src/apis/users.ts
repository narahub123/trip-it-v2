import axios from "axios";
import { getCookie } from "utilities/Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

// 유저 목록 가져오기
export const fetchUsersAPI = async (
  sortKey?: string,
  sortValue?: string,
  page?: number,
  size?: number,
  field?: string,
  search?: string
) => {
  try {
    const users = await axios.get(
      `${baseURL}/admin/users?sortKey=${sortKey}&sortValue=${sortValue}&page=${page}&size=${size}&search=${search}&field=${field}`,
      {
        headers: {
          "Content-Type": "application/json",
          Access: `${localStorage.getItem("access")}`,
          Refresh: `${getCookie("refresh")}`,
        },
        withCredentials: true,
      }
    );

    console.log(users);

    return users;
  } catch (err: any) {
    console.log(err);
    const status = err.response.status;
    const code = err.response.data.code;
    let msgId = 0;

    if (code === 1) {
      msgId = 1;
    } else if (code === 3) {
      msgId = 2;
    }

    throw { msgId };
  }
};
