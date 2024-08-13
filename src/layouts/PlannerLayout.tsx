import Footer from "templates/Moblie/components/Footer";
import "./planLayout.css";
import Plan from "pages/Plan/Plan";
import Planner from "pages/Planner/Planner";

const PlannerLayout = () => {
  return (
    <div className="planner-layout">
      <Planner />
      <Footer />
    </div>
  );
};

export default PlannerLayout;
