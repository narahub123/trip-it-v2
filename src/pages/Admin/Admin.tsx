import MyPageHeader from "pages/mypage/components/MyPageHeader";
import { Outlet } from "react-router-dom";
import "./admin.css";

const adminList = [
  { title: "유저 목록", link: "./users" },
  { title: "일정 목록", link: "./schedules" },
  { title: "모집글 목록", link: "./posts" },
  { title: "차단 목록", link: "./blocks" },
  { title: "신고 목록", link: "./reports" },
];

const Admin = () => {
  return (
    <div className="admin">
      <MyPageHeader list={adminList} />
      <Outlet />
    </div>
  );
};

export default Admin;
