import { Route, Routes } from "react-router-dom";
import PlanLayout from "layouts/PlanLayout";
import RootLayout from "layouts/RootLayout";
import Chat from "pages/Chat/Chat";
import Login from "pages/Auth/Login";
import Normal from "pages/Auth/Normal";
import Join from "pages/Auth/Join";

const Trip = () => {
  return (
    <>
      <Chat />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/login/normal" element={<Normal />} />
          <Route path="/join" element={<Join />} />
        </Route>
        <Route path="/planner" element={<PlanLayout />}></Route>
      </Routes>
    </>
  );
};

export default Trip;
