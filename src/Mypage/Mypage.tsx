import "./mypage.css";
import { mypageList } from "pages/mypage/data/header";
import MypageChipHeader from "./components/MypageChipHeader";
import { Outlet } from "react-router-dom";

const Mypage = () => {
  return (
    <div className="mypage">
      <MypageChipHeader list={mypageList} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Mypage;
