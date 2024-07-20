import PlanLayout from "layouts/PlanLayout";
import RootLayout from "layouts/RootLayout";
import Login from "pages/Auth/Login";
import { Route, Routes } from "react-router-dom";

const Trip = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/planner" element={<PlanLayout />}></Route>
    </Routes>
  );
};

export default Trip;
