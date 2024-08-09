import Footer from "templates/Moblie/components/Footer";
import "./planLayout.css";
import Plan from "pages/Plan/Plan";
import Planner from "pages/Planner/Planner";

const PlannerLayout = () => {
  return (
    <div className="planner-layout">
      <Planner />
      <div className="mypage-footer-blank" />
      <Footer />
    </div>
  );
};

export default PlannerLayout;
