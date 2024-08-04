import Footer from "templates/Moblie/components/Footer";
import "./planLayout.css";
import PlanCalendar from "pages/Mobile/Plan/PlanCalendar";

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
