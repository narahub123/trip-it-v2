import { Route, Routes } from "react-router-dom";
import PlanLayout from "layouts/PlanLayout";
import RootLayout from "layouts/RootLayout";
import Chat from "pages/Chat/Chat";
import Login from "pages/Auth/Login";
import Normal from "pages/Auth/Normal";
import Join from "pages/Auth/Join";
import { useEffect } from "react";
import refreshAPI from "./utilities/TokenRefresher";
import MyPage from "pages/mypage/MyPage";
import Profile from "pages/mypage/profile/Profile";
import Block from "pages/mypage/block/Block";
import Blocks from "pages/Admin/Blocks/Blocks";
import Admin from "pages/Admin/Admin";
import Test from "test/Test";
import Report from "pages/mypage/Report/Report";
import Reports from "pages/Admin/Reports/Reports";
import Users from "pages/Admin/Users/Users";

const Trip = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await refreshAPI.get("");
      } catch (err) {
        console.log("에러확인 : ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Chat />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/login/normal" element={<Normal />} />
          <Route path="/join" element={<Join />} />
          <Route path="/mypage" element={<MyPage />}>
            <Route path="/mypage/profile" element={<Profile />} />
            <Route path="/mypage/blocks" element={<Block />} />
            <Route path="/mypage/reports" element={<Report />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/blocks" element={<Blocks />} />
            <Route path="/admin/reports" element={<Reports />} />
          </Route>
          <Route path="/test" element={<Test />} />
        </Route>
        <Route path="/planner" element={<PlanLayout />}></Route>
      </Routes>
    </>
  );
};

export default Trip;
