import axios from "axios";
import { getCookie } from "utilities/Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

console.log(baseURL);

export const fetchProfileAPI = async () => {
  const profile = await axios.get(`${baseURL}/mypage/profile`, {
    headers: {
      "Content-Type": "application/json",
      Access: `${localStorage.getItem("access")}`,
      Refresh: `${getCookie("refresh")}`,
    },
    withCredentials: true,
  });

  console.log(profile);
  return profile;
};
