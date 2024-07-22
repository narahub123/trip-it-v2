import { Outlet } from "react-router-dom";
import MyPageHeader from "./components/MyPageHeader";
import "./mypage.css";

const MyPage = () => {
  return (
    <div className="mypage">
      <MyPageHeader />
      <Outlet />
    </div>
  );
};

export default MyPage;
