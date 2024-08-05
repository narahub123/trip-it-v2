import { PlaceApiType } from "types/place";
import "./planPlaceCard.css";

export interface PlanPlaceCardProps {
  place: PlaceApiType;
}

const PlanPlaceCard = ({ place }: PlanPlaceCardProps) => {
  return <li className="plan-places-main-card">{place.title}</li>;
};

export default PlanPlaceCard;
