import MyPageHeader from "pages/mypage/components/MyPageHeader";
import { Outlet } from "react-router-dom";
import "./admin.css";

const Admin = () => {
  return (
    <div className="admin">
      <MyPageHeader />
      <Outlet />
    </div>
  );
};

export default Admin;
