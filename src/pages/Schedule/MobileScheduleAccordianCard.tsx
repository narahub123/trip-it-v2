import "./mobileScheduleAccordianCard.css";
import { fetchPlaceAPI } from "apis/place";
import { useEffect, useState } from "react";
import { PlaceApiType } from "types/place";
import { ScheduleDetailType } from "types/schedule";

export interface MobileScheduleAccordianCardProps {
  detail: ScheduleDetailType;
}

const MobileScheduleAccordianCard = ({
  detail,
}: MobileScheduleAccordianCardProps) => {
  return (
    <>
      <li className="mobile-schedule-accordian-card">loading...</li>
    </>
  );
};

export default MobileScheduleAccordianCard;
