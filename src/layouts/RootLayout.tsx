import Header from "components/Header";
import "./rootLayout.css";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
