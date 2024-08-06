import { IoIosArrowDropup } from "react-icons/io";
import "./planSubmit.css";
import PlanSubmitSelectedPlaceCard from "./PlanSubmitSelectedPlaceCard";
import { convertDateToYYYYMMDD, convertDateTypeToDate2 } from "utilities/date";
import { useState } from "react";
import PlanColumnCard from "./PlanColumnCard";
import { ScheduleDetailDtoInputType } from "types/plan";
import { useNavigate } from "react-router-dom";
import { saveSchedule } from "apis/schedule";
export interface PlanSubmitProps {
  metroId: string;
  dates: Date[];
  selectedPlaces: string[];
  setSelectedPlaces: (value: string[]) => void;
  columns: { [key: string]: ScheduleDetailDtoInputType[] };
  setColumns: (value: { [key: string]: ScheduleDetailDtoInputType[] }) => void;
}
const PlanSubmit = ({
  metroId,
  dates,
  selectedPlaces,
  setSelectedPlaces,
  columns,
  setColumns,
}: PlanSubmitProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [openAccordian, setOpenAccordin] = useState("selected");

  const handleOpen = (containerName: string) => {
    if (containerName === openAccordian) {
      setOpenAccordin("");
    } else {
      setOpenAccordin(containerName);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setTitle(value);
  };

  const handleSubmit = () => {
    console.log("일정 세부", columns);
    const start = convertDateToYYYYMMDD(dates[0]);
    const end = convertDateToYYYYMMDD(dates[dates.length - 1]);

    const scheduleDetails: ScheduleDetailDtoInputType[] = [];
    const values = Object.values(columns);
    console.log(values);
    for (let i = 0; i < values.length; i++) {
      const column = values[i];
      for (const detail of column) {
        scheduleDetails.push(detail);
      }
    }

    const submitValue = {
      scheduleDto: {
        metroId: metroId,
        startDate: start,
        endDate: end,
        scheduleTitle: title,
      },
      detailScheduleDto: scheduleDetails,
    };

    console.log(submitValue);

    saveSchedule(submitValue)
      .then((res) => {
        console.log(res.data);
        if (!res) return;

        if (res.status === 200) {
          console.log("등록 성공");
          navigate("/mypage/schedule");
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(selectedPlaces);
  console.log(columns);

  return (
    <div className="plan-submit">
      <div className="plan-submit-header">
        <h3>일정 등록</h3>
      </div>
      <section className="plan-submit-title">
        <label>
          <p>일정 이름</p>
          <input type="text" onChange={(e) => handleTitleChange(e)} />
        </label>
      </section>

      <section className={`plan-submit-main`}>
        <div
          className="plan-submit-main-title"
          onClick={
            selectedPlaces.length === 0
              ? undefined
              : () => handleOpen("selected")
          }
        >
          <p>선택한 장소</p>
          <span
            className={`plan-submit-main-title-icon ${
              openAccordian === "selected" ? "active" : ""
            }`}
          >
            <IoIosArrowDropup />
          </span>
        </div>

        <ul
          className={`plan-submit-main-container ${
            openAccordian === "selected" ? "active" : ""
          }`}
        >
          {selectedPlaces.map((selectedPlace) => (
            <PlanSubmitSelectedPlaceCard
              metroId={metroId}
              contentId={selectedPlace}
              selectedPlaces={selectedPlaces}
              setSelectedPlaces={setSelectedPlaces}
              dates={dates}
              key={selectedPlace}
              columns={columns}
              setColumns={setColumns}
              setOpenAccordin={setOpenAccordin}
            />
          ))}
          {selectedPlaces.length !== 0 && (
            <div className="plan-submit-main-map">map</div>
          )}
        </ul>
      </section>
      {dates &&
        dates.map((date) => (
          <section
            className="plan-submit-main"
            key={convertDateTypeToDate2(date)}
          >
            <div
              className="plan-submit-main-title"
              onClick={() => handleOpen(convertDateTypeToDate2(date))}
            >
              <p>{convertDateTypeToDate2(date)}</p>
              <span
                className={`plan-submit-main-title-icon ${
                  openAccordian === convertDateTypeToDate2(date) ? "active" : ""
                }`}
              >
                <IoIosArrowDropup />
              </span>
            </div>

            <ul
              className={`plan-submit-main-container ${
                openAccordian === convertDateTypeToDate2(date) ? "active" : ""
              }`}
            >
              {columns[convertDateTypeToDate2(date)].map((detail) => (
                <PlanColumnCard
                  metroId={metroId}
                  date={date}
                  dates={dates}
                  detail={detail}
                  columns={columns}
                  setColumns={setColumns}
                  setOpenAccordin={setOpenAccordin}
                  key={detail.contentId}
                />
              ))}
              <div className="plan-submit-main-map">map</div>
            </ul>
          </section>
        ))}
      <section className="plan-submit-btns">
        <button className="plan-submit-btns-prev" onClick={() => navigate(-1)}>
          이전
        </button>
        <button
          className={`plan-submit-btns-submit${
            selectedPlaces.length === 0 ? "-active" : ""
          }`}
          onClick={() => handleSubmit()}
        >
          등록
        </button>
      </section>
    </div>
  );
};

export default PlanSubmit;
