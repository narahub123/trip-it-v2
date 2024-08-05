import Footer from "templates/Moblie/components/Footer";
import "./planLayout.css";
import Plan from "pages/Plan/Plan";

const PlanLayout = () => {
  return (
    <div className="plan-layout">
      <Plan />
      <div className="mypage-footer-blank" />
      <Footer />
    </div>
  );
};

export default PlanLayout;
