import { Outlet } from "react-router-dom";
import MyPageHeader from "./components/MyPageHeader";
import "./mypage.css";

const mypageList = [
  { title: "개인정보", link: "./profile" },
  { title: "내 일정", link: "./schedules" },
  { title: "내 모집글", link: "./posts" },
  { title: "차단 목록", link: "./blocks" },
  { title: "신고 목록", link: "./reports" },
];
const MyPage = () => {
  return (
    <div className="mypage">
      <MyPageHeader list={mypageList} />
      <Outlet />
    </div>
  );
};

export default MyPage;
