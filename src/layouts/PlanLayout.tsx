import Footer from "templates/Moblie/components/Footer";
import "./planLayout.css";
import PlanCalendar from "pages/Plan/PlanCalendar";

const PlanLayout = () => {
  return (
    <div className="plan-layout">
      <PlanCalendar />
      <div className="mypage-footer-blank" />
      <Footer />
    </div>
  );
};

export default PlanLayout;
