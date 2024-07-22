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

// 현재 비밀번호 확인 API 호출 함수
export const checkPassordAPI = async (password: string) => {
  try {
    // 비밀번호 확인 요청을 서버에 보냄
    const response = await axios.post(
      `${baseURL}/mypage/profile/checkPassword`, // 비밀번호 확인 엔드포인트
      {
        password, // 요청 본문에 비밀번호 포함
      },
      {
        headers: {
          "Content-Type": "application/json", // 요청 본문 타입을 JSON으로 설정
          Access: `${localStorage.getItem("access")}`, // 액세스 토큰 헤더 설정
          Refresh: `${getCookie("refresh")}`, // 리프레시 토큰 헤더 설정
        },
        withCredentials: true, // 쿠키를 요청에 포함
      }
    );

    return response; // 서버 응답 반환
  } catch (err: any) {
    // 에러 발생 시 처리
    if (err.response.data.code === 2) {
      // 비밀번호가 일치하지 않는 경우
      window.alert("잘못된 비밀번호입니다."); // 사용자에게 오류 메시지 알림
    }
  }
};

// 비밀번호 변경 API 호출 함수
export const updatePasswordAPI = async (password: string) => {
  try {
    // 비밀번호 변경 요청을 서버에 보냄
    const response = await axios.post(
      `${baseURL}/mypage/profile/passwordUpdate`, // 비밀번호 변경 엔드포인트
      {
        password, // 요청 본문에 새로운 비밀번호 포함
      },
      {
        headers: {
          "Content-Type": "application/json", // 요청 본문 타입을 JSON으로 설정
          Access: `${localStorage.getItem("access")}`, // 액세스 토큰 헤더 설정
          Refresh: `${getCookie("refresh")}`, // 리프레시 토큰 헤더 설정
        },
        withCredentials: true, // 쿠키를 요청에 포함
      }
    );

    return response; // 서버 응답 반환
  } catch (err: any) {
    // 에러 발생 시 처리
    if (err.response.data.code === 1) {
      // 비밀번호가 없거나 잘못된 경우
      window.alert("잘못된 비밀번호입니다."); // 사용자에게 오류 메시지 알림
    } else if (err.response.data.code === 2) {
      // 비밀번호 변경 중 다른 에러 발생 시 처리
      window.alert(""); // 빈 알림 (어떤 메시지도 표시하지 않음)
    } else if (err.response.data.code === 6) {
      // 현재 비밀번호와 동일한 비밀번호를 입력한 경우
      window.alert("현재 비밀번호와 동일한 비밀번호입니다."); // 사용자에게 오류 메시지 알림
    }
  }
};
