import { Route, Routes } from "react-router-dom";
import PlanLayout from "layouts/PlanLayout";
import RootLayout from "layouts/RootLayout";
import Chat from "pages/Chat/Chat";
import Login from "pages/Auth/Login";
import Normal from "pages/Auth/Normal";
import Join from "pages/Auth/Join";
import { useEffect } from "react";
import refreshAPI from "./utilities/TokenRefresher";

import Profile from "pages/mypage/Profile/Profile";
import Block from "pages/mypage/Block/Block";
import Blocks from "pages/Admin/Blocks/Blocks";
import Admin from "pages/Admin/Admin";
import Test from "test/Test";
import Report from "pages/mypage/Report/Report";
import Reports from "pages/Admin/Reports/Reports";
import Users from "pages/Admin/Users/Users";
import PostsM from "pages/mypage/PostsM/PostsM";
import PostsA from "pages/Admin/PostsA/PostsA";
import SchedulesM from "pages/mypage/SchedulesM/SchedulesM";
import SchedulesA from "pages/Admin/SchedulesA/SchedulesA";
import User from "pages/Admin/Users/User";
import Carousel from "test/Carousel";
import PlanHome from "pages/Plan/PlanHome";
import Schedule from "pages/Schedule/Schedule";
import PlannerHome from "pages/Planner/PlannerHome/PlannerHome";
import Planner from "pages/Planner/Planner";
import Mypage from "Mypage/Mypage";
import MyPageSchedule from "Mypage/MypageSchedule/MypageSchedule";
import MypageBlock from "Mypage/MypageBlock/MypageBlock";
import MypageReport from "Mypage/MypageReport/MypageReport";
import MypageProfile from "Mypage/MypageProfile/MypageProfile";

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
          <Route path="/mypage" element={<Mypage />}>
            <Route element={<Mypage />} />
            <Route path="/mypage" element={<MypageProfile />} />
            <Route path="/mypage/profile" element={<MypageProfile />} />
            <Route path="/mypage/blocks" element={<MypageBlock />} />
            <Route path="/mypage/reports" element={<MypageReport />} />
            <Route path="/mypage/posts" element={<PostsM />} />
            <Route path="/mypage/schedules" element={<MyPageSchedule />} />
          </Route>
          <Route element={<Admin />}>
            <Route path="/admin" element={<Users />} />
            <Route path="/admin/users/:userId" element={<User />} />
            <Route path="/admin/blocks" element={<Blocks />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/posts" element={<PostsA />} />
            <Route path="/admin/schedules" element={<SchedulesA />} />
          </Route>
          <Route path="/planner" element={<PlannerHome />} />
          <Route path="/plan" element={<PlanHome />} />
          <Route path="/test" element={<Test />}></Route>
          <Route path="/test/carousel" element={<Carousel />} />
          <Route path="/mypage/schedules/:scheduleId" element={<Schedule />} />
          <Route path="/planner/:metroName" element={<Planner />} />
        </Route>
      </Routes>
    </>
  );
};

export default Trip;
