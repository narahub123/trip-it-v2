import "./plannerPc.css";
import { PlannerPlacesProps } from "../PlannerPlace/PlannerPlaces";
import { useEffect, useState } from "react";
import { ColumnType } from "types/plan";
import { convertDateTypeToDate2 } from "utilities/date";
import MapClusterPc from "./PlannerMap/MapClusterPc";
import PlannerPcStages from "./PlannerPcStages/PlannerPcStages";
import { getInfos, getPositions } from "utilities/map";
import { PlaceApiType } from "types/place";

export interface InfoType {
  distance: number | string;
  duration: number | string;
}

const PlannerPc = ({ metroId, dates, setDates }: PlannerPlacesProps) => {
  const [date, setDate] = useState<Date>(new Date());
  // 이동거리, 시간 정보
  const [infos, setInfos] = useState<(InfoType | undefined)[]>([]);

  const allInfosObj: Record<string, any> = dates.reduce((acc, date) => {
    const dateString = convertDateTypeToDate2(date);
    acc[dateString] = []; //
    return acc;
  }, {} as Record<string, any>);

  const [allInfos, setAllInfos] = useState<{
    [key: string]: (InfoType | undefined)[];
  }>(allInfosObj);

  const [columns, setColumns] = useState<{ [key: string]: ColumnType[] }>({});
  const column = columns[convertDateTypeToDate2(date)] || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        kakao.maps.load(async () => {
          const columnArr = Object.values(columns);
          const columnKeys = Object.keys(columns);

          let newAllInfos = { ...allInfos };

          for (let j = 0; j < columnArr.length; j++) {
            // 외부 루프의 변수명을 j로 변경
            const key = columnKeys[j];
            const places: PlaceApiType[] = columnArr[j].map(
              (item) => item.place
            );
            const positions = await getPositions(places);

            const newInfos: (InfoType | undefined)[] = [];
            for (let k = 0; k < positions.length - 1; k++) {
              // 내부 루프의 변수명을 k로 변경
              const start = k;
              const end = k + 1;

              const info: InfoType | undefined = await getInfos(
                positions[start].latlng,
                positions[end].latlng
              );

              newInfos.push(info);
            }

            newAllInfos[key] = newInfos;
          }

          if (JSON.stringify(newAllInfos) !== JSON.stringify(allInfos)) {
            setAllInfos(newAllInfos);
          }
        });
      } catch (error) {
        console.log("에러", error);
      }
    };

    fetchData(); // useEffect 내부에서 fetchData 호출
  }, [columns]);


  return (
    <div className="planner-pc">
      <PlannerPcStages
        metroId={metroId}
        setSelectedDate={setDate}
        dates={dates}
        setDates={setDates}
        columns={columns}
        setColumns={setColumns}
        date={date}
        setDate={setDate}
        infos={infos}
        allInfos={allInfos}
      />

      <section className="planner-pc-map">
        <MapClusterPc
          key={`mapCluster${date.toDateString()}`}
          metroId={metroId}
          column={column}
          date={date}
          infos={infos}
          setInfos={setInfos}
        />
      </section>
    </div>
  );
};

export default PlannerPc;
