import axios from "axios";
import { getCookie } from "utilities/Cookie";

const baseURL = process.env.REACT_APP_SERVER_URL;

export const fetchPlacesAPI = async (
  metroId: string,
  pageNo: string,
  contentTypeId: string
) => {
  try {
    const places = await axios.get(
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

    return places;
  } catch (err: any) {}
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
  } catch (err: any) {}
};

export const fetchPlacesByKeyword = async (
  metroId: string,
  pageNo: string,
  contentTypeId: string,
  keyword: string
) => {
  try {
    const places = await axios.get(
      `${baseURL}/home/apiSearch/${metroId}/${pageNo}/${contentTypeId}/${keyword}}`,
      {
        headers: {
          "Content-Type": "application/json",
          Access: `${localStorage.getItem("access")}`,
          Refresh: `${getCookie("refresh")}`,
        },
        withCredentials: true,
      }
    );

    return places;
  } catch (err: any) {}
};

