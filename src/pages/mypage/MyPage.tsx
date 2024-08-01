import { Outlet } from "react-router-dom";
import MyPageHeader from "./components/MyPageHeader";
import "./mypage.css";
import { mypageList } from "./data/header";
import ChipHeader from "../Mobile/ChipHeader";
import ProfileMobile from "../Mobile/ProfileMobile";
import Footer from "../Mobile/Footer";

const MyPage = () => {
  return (
    <div className="mypage">
      <MyPageHeader list={mypageList} />
      <ChipHeader list={mypageList} />
      <Outlet />
      <div className="mypage-footer-blank" />
      <Footer />
    </div>
  );
};

export default MyPage;
