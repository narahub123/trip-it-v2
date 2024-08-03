import { Outlet } from "react-router-dom";
import MyPageHeader from "./components/MyPageHeader";
import "./mypage.css";
import { mypageList } from "./data/header";
import ChipHeader from "../Mobile/ChipHeader";
import ProfileMobile from "../Mobile/ProfileMobile";
import Footer from "../../templates/Moblie/components/Footer";
import MobileHeader from "templates/Moblie/components/MobileHeader";

const MyPage = () => {
  return (
    <div className="mypage">
      <div className="mypage-title">마이 페이지</div>
      <MyPageHeader list={mypageList} />
      <ChipHeader list={mypageList} />
      <MobileHeader list={mypageList} />
      <Outlet />
    </div>
  );
};

export default MyPage;
