import { useNavigate } from "react-router-dom";
import "./planPlaces.css";
import "./planSubmit.css";
import { IoIosArrowDropup } from "react-icons/io";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useEffect, useState } from "react";
import { PlaceApiType } from "types/place";
import PlanPlaceCard from "./PlanPlaceCard";
import PlanSelectedPlaceCard from "./PlanSelectedPlaceCard";
import { getMetroName } from "utilities/metros";
import {
  convertDateToYYYYMMDD,
  convertDateTypeToDate1,
  convertDateTypeToDate2,
} from "utilities/date";
import { fetchPlacesAPI } from "apis/place";
import { ColumnType, ScheduleDetailDtoInputType } from "types/plan";
import PlanAccordian from "./components/PlanAccordian";
import { saveSchedule } from "apis/schedule";

export interface PlanPlacesProps {
  metroId: string;
  dates: Date[];
  selectedPlaces: PlaceApiType[];
  setSelectedPlaces: (value: PlaceApiType[]) => void;
  columns: { [key: string]: ColumnType[] };
  setColumns: (value: { [key: string]: ColumnType[] }) => void;
}

const PlanPlaces = ({
  metroId,
  dates,
  selectedPlaces,
  setSelectedPlaces,
  columns,
  setColumns,
}: PlanPlacesProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState<PlaceApiType[]>([]);
  const [pageNo, setPageNo] = useState("1");
  const [contentTypeId, setContentTypeId] = useState("12");
  const [openAccordian, setOpenAccordin] = useState("");

  // 제출 가능 상태 확인
  const defaultValid = dates.reduce((acc, date) => {
    const key = convertDateTypeToDate2(date);
    acc[key] = false;
    return acc;
  }, {} as { [key: string]: boolean });
  const [valid, setValid] = useState<{ [key: string]: boolean }>(defaultValid);
  const [completed, setCompleted] = useState(false);

  // 일정 제목
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (dates.length === 0 || !dates) {
      navigate(-1);
    }
  }, [dates]);

  useEffect(() => {
    const allValid = Object.values(valid).every((v) => v === true);
    setCompleted(allValid);
  }, [valid]);

  useEffect(() => {
    setLoading(true);
    fetchPlacesAPI(metroId, pageNo, contentTypeId)
      .then((res) => {
        if (!res) return;

        setPlaces(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.code === 0) {
          console.log("네트워크 오류, 연결 상태 확인 요망");
        }
        setLoading(false);
      });
  }, [metroId, contentTypeId, pageNo]);

  const startDate = dates.length > 0 && convertDateTypeToDate1(dates[0]);
  const endDate =
    dates.length > 0 && convertDateTypeToDate1(dates[dates.length - 1]);

  console.log(openAccordian);

  const handleOpen = (containerName: string) => {
    if (containerName === "input") return;

    if (containerName === openAccordian) {
      setOpenAccordin("");
    } else {
      if (containerName === "place") {
        setContentTypeId("12");
      } else if (containerName === "accomm") {
        setContentTypeId("32");
      } else {
        return setOpenAccordin(containerName);
      }
      setOpenAccordin(containerName);
    }
  };

  const handleInputOpen = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const handleContentTypeId = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    contentTypeId: string
  ) => {
    e.stopPropagation();
    setContentTypeId(contentTypeId);
  };

  console.log(selectedPlaces);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
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

    saveSchedule(submitValue)
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
  return (
    <div className="plan-places">
      <section className="plan-places-info">
        <h3 className="plan-placesd-info-title">장소</h3>
      </section>
      <section
        className={`plan-places-main ${
          openAccordian === "info" ? "active" : ""
        }`}
        onClick={(e) => handleOpen("info")}
      >
        <div className="plan-places-main-title">
          <p>일정 정보</p>
          <span className="plan-places-main-title-icon">
            <IoIosArrowDropup />
          </span>
        </div>
        <ul className="plan-places-main-container">
          <li className="plan-places-main-item">
            <span>이름</span>
            <span onClick={(e) => handleInputOpen(e)}>
              <input
                type="text"
                autoFocus={openAccordian === "info" ? true : false}
                onChange={(e) => handleTitleChange(e)}
              />
            </span>
          </li>
          <li className="plan-places-main-item">
            <span>지역</span>
            <span>{getMetroName(metroId)}</span>
          </li>
          <li className="plan-places-main-item">
            <span>기간</span>
            <span>
              {!startDate || !endDate ? "알수없음" : `${startDate}~${endDate}`}
            </span>
          </li>
        </ul>
      </section>

      <section
        className={`plan-places-main place ${
          openAccordian === "place" ? "active" : ""
        }`}
        onClick={() => handleOpen("place")}
      >
        <div className="plan-places-main-title">
          <p>외부 api 장소</p>
          <span className="plan-places-main-title-icon">
            <IoIosArrowDropup />
          </span>
        </div>

        <ul className="plan-places-main-container">
          <div className="plan-places-main-tags">
            <span
              className={`plan-places-main-tags-item ${
                contentTypeId === "12" ? "active" : ""
              }`}
              onClick={(e) => handleContentTypeId(e, "12")}
            >
              관광
            </span>
            <span
              className={`plan-places-main-tags-item ${
                contentTypeId === "14" ? "active" : ""
              }`}
              onClick={(e) => handleContentTypeId(e, "14")}
            >
              문화
            </span>
            <span
              className={`plan-places-main-tags-item ${
                contentTypeId === "39" ? "active" : ""
              }`}
              onClick={(e) => handleContentTypeId(e, "39")}
            >
              음식
            </span>
          </div>
          {loading ? (
            <li className="plan-places-main-loading">loading...</li>
          ) : places.length === 0 ? (
            <li className="plan-places-main-none">검색 결과가 없습니다.</li>
          ) : (
            places.map((place) => (
              <PlanPlaceCard
                place={place}
                metroId={metroId}
                selectedPlaces={selectedPlaces}
                setSelectedPlaces={setSelectedPlaces}
                key={place.contentid}
              />
            ))
          )}
        </ul>
      </section>
      <section
        className={`plan-places-main accomm ${
          openAccordian === "accomm" ? "active" : ""
        }`}
        onClick={() => handleOpen("accomm")}
      >
        <div className="plan-places-main-title">
          <p>외부 api 숙소</p>
          <span className="plan-places-main-title-icon">
            <IoIosArrowDropup />
          </span>
        </div>

        <ul className="plan-places-main-container">
          <div className="plan-places-main-tags">
            <span
              className={`plan-places-main-tags-item ${
                contentTypeId === "32" ? "active" : ""
              }`}
            >
              숙소
            </span>
          </div>
          {loading ? (
            <li className="plan-places-main-loading">loading...</li>
          ) : places.length === 0 ? (
            <li className="plan-places-main-none">검색 결과가 없습니다.</li>
          ) : (
            places.map((place) => (
              <PlanPlaceCard
                place={place}
                metroId={metroId}
                selectedPlaces={selectedPlaces}
                setSelectedPlaces={setSelectedPlaces}
                key={place.contentid}
              />
            ))
          )}
        </ul>
      </section>
      <section
        className={`plan-places-main selected ${
          openAccordian === "selected" ? "active" : ""
        }`}
        onClick={
          selectedPlaces.length === 0
            ? () => handleOpen("")
            : () => handleOpen("selected")
        }
      >
        <div className="plan-places-main-title">
          <p>
            <span>선택한 장소</span>
            <span>{` : ${selectedPlaces.length}곳`}</span>
          </p>
          <span className="plan-places-main-title-icon">
            <IoIosArrowDropup />
          </span>
        </div>

        <ul className="plan-places-main-container">
          <div className="plan-places-main-tags deactive"></div>
          {selectedPlaces.length === 0 && <li>선택한 장소가 없습니다.</li>}
          {selectedPlaces.map((selectedPlace) => (
            <PlanSelectedPlaceCard
              metroId={metroId}
              contentId={selectedPlace.contentid}
              selectedPlaces={selectedPlaces}
              setSelectedPlaces={setSelectedPlaces}
              key={selectedPlace.contentid}
            />
          ))}
        </ul>
      </section>
      {dates.length > 0 &&
        dates.map((date) => (
          <PlanAccordian
            metroId={metroId}
            date={date}
            dates={dates}
            columns={columns}
            setColumns={setColumns}
            openAccordian={openAccordian}
            setOpenAccordin={setOpenAccordin}
            handleOpen={handleOpen}
            selectedPlaces={selectedPlaces}
            setSelectedPlaces={setSelectedPlaces}
            valid={valid}
            setValid={setValid}
          />
        ))}
      <section className="plan-places-btns">
        <button
          className="plan-places-btns before"
          onClick={() => navigate(-1)}
        >
          <LuChevronLeft />
          장소
        </button>
        <button
          className={`plan-places-btns-submit${
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

export default PlanPlaces;
