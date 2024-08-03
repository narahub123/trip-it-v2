import Header from "components/Header";
import "./rootLayout.css";
import { Outlet } from "react-router-dom";
import Footer from "templates/Moblie/components/Footer";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <div className="mypage-footer-blank" />
      <Footer />
    </div>
  );
};

export default RootLayout;
