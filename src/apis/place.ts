import axios from "axios";
import { getCookie } from "utilities/Cookie";
import { convertStringToJson } from "utilities/place";

const baseURL = process.env.REACT_APP_SERVER_URL;

export const fetchPlacesAPI = async (
  metroId: string,
  pageNo: string,
  contentTypeId: string
) => {
  try {
    const res = await axios.get(
      `${baseURL}/home/apiList/${metroId}/${pageNo}/${contentTypeId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Access: `${localStorage.getItem("access")}`,
          Refresh: `${getCookie("refresh")}`,
        },
        withCredentials: true,
      }
    );

    const response = res.data;

    if (typeof response === "string") {
      return convertStringToJson(response);
    } else {
      return response;
    }
  } catch (err: any) {
    console.log(err);
    if (err.code === "ERR_NETWORK") {
      throw { code: 0 };
    }
  }
};

export const fetchPlaceAPI = async (contentId: string) => {
  try {
    const place = await axios.get(`${baseURL}/home/apiDetail/${contentId}`, {
      headers: {
        "Content-Type": "application/json",
        Access: `${localStorage.getItem("access")}`,
        Refresh: `${getCookie("refresh")}`,
      },
      withCredentials: true,
    });

    return place;
  } catch (err: any) {
    console.log(err);
    const code = err.response.data.code;
    if (code === 6) {
      throw { code };
    } else if (err.code === "ERR_NETWORK") {
      throw { code: 0 };
    }
    throw { err };
  }
};

export const fetchPlacesByKeywordAPI = async (
  metroId: string,
  pageNo: string,
  contentTypeId: string,
  keyword: string
) => {
  try {
    const res = await axios.get(
      `${baseURL}/home/apiSearch/${metroId}/${pageNo}/${contentTypeId}/${keyword}`,
      {
        headers: {
          "Content-Type": "application/json",
          Access: `${localStorage.getItem("access")}`,
          Refresh: `${getCookie("refresh")}`,
        },
        withCredentials: true,
      }
    );

    const response = res.data;

    if (typeof response === "string") {
      return convertStringToJson(response);
    } else {
      return response;
    }
  } catch (err: any) {
    if (err.code === "ERR_NETWORK") {
      throw { code: 0 };
    }
  }
};
