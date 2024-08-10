import { IoIosArrowDropup } from "react-icons/io";
import "./planSubmit.css";
import PlanSubmitSelectedPlaceCard from "./PlanSubmitSelectedPlaceCard";
import { convertDateToYYYYMMDD, convertDateTypeToDate2 } from "utilities/date";
import { useEffect, useState } from "react";
import PlanColumnCard from "./PlanColumnCard";
import { ColumnType, ScheduleDetailDtoInputType } from "types/plan";
import { useNavigate } from "react-router-dom";
import { saveScheduleAPI } from "apis/schedule";
import PlanAccordian from "./components/PlanAccordian";
import { PlaceApiType } from "types/place";
export interface PlanSubmitProps {
  metroId: string;
  dates: Date[];
  selectedPlaces: PlaceApiType[];
  setSelectedPlaces: (value: PlaceApiType[]) => void;
  columns: { [key: string]: ColumnType[] };
  setColumns: (value: { [key: string]: ColumnType[] }) => void;
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
  const [openAccordian, setOpenAccordian] = useState("selected");

  // 제출 가능 상태 확인
  const defaultValid = dates.reduce((acc, date) => {
    const key = convertDateTypeToDate2(date);
    acc[key] = false;
    return acc;
  }, {} as { [key: string]: boolean });
  const [valid, setValid] = useState<{ [key: string]: boolean }>(defaultValid);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const allValid = Object.values(valid).every((v) => v === true);
    setCompleted(allValid);
  }, [valid]);

  const handleOpen = (containerName: string) => {
    if (containerName === openAccordian) {
      setOpenAccordian("");
    } else {
      setOpenAccordian(containerName);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setTitle(value);
  };

  const handleSubmit = () => {
    if (!title) return alert("일정 제목을 적어주세요");
    const start = convertDateToYYYYMMDD(dates[0]);
    const end = convertDateToYYYYMMDD(dates[dates.length - 1]);

    const scheduleDetails: ScheduleDetailDtoInputType[] = [];
    const values = Object.values(columns);
    console.log(values);
    for (let i = 0; i < values.length; i++) {
      const column = values[i];
      for (const detail of column) {
        const newDetail: ScheduleDetailDtoInputType = {
          contentId: detail.place.contentid,
          scheduleOrder: detail.scheduleOrder,
          startTime: detail.startTime,
          endTime: detail.endTime,
        };
        scheduleDetails.push(newDetail);
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

    saveScheduleAPI(submitValue)
      .then((res) => {
        console.log(res.data);
        if (!res) return;

        if (res.status === 200) {
          console.log("등록 성공");
          navigate("/mypage/schedules");
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
      <section className={`plan-submit-title ${title ? "active" : ""}`}>
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
              ? () => handleOpen("")
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
              contentId={selectedPlace.contentid}
              selectedPlaces={selectedPlaces}
              setSelectedPlaces={setSelectedPlaces}
              dates={dates}
              key={selectedPlace.contentid}
              columns={columns}
              setColumns={setColumns}
              setOpenAccordian={setOpenAccordian}
            />
          ))}
          {selectedPlaces.length !== 0 && (
            <div className="plan-submit-main-map">map</div>
          )}
        </ul>
      </section>
      {dates &&
        dates.map((date) => (
          <PlanAccordian
            metroId={metroId}
            date={date}
            dates={dates}
            columns={columns}
            setColumns={setColumns}
            openAccordian={openAccordian}
            setOpenAccordian={setOpenAccordian}
            handleOpen={handleOpen}
            selectedPlaces={selectedPlaces}
            setSelectedPlaces={setSelectedPlaces}
            valid={valid}
            setValid={setValid}
          />
        ))}
      <section className="plan-submit-btns">
        <button
          className="plan-submit-btns-prev"
          onClick={() => navigate(`/planner/${metroId}#place`)}
        >
          이전
        </button>
        <button
          className={`plan-submit-btns-submit${
            title && completed ? "-active" : ""
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
