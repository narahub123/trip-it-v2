import { ColumnType } from "types/plan";
import "./mapClusterPc.css";
import { useEffect, useState } from "react";
import { PlaceApiType } from "types/place";
import { getCarDirection } from "utilities/map";
import { metros } from "data/metros";
import { useRenderCount } from "@uidotdev/usehooks";
export interface MapClusterPcProps {
  metroId: string;
  column: ColumnType[];
  date: Date;
  infos: ({ distance: number; duration: number } | undefined)[];
  setInfos: (
    value: ({ distance: number; duration: number } | undefined)[]
  ) => void;
}
const MapClusterPc = ({
  metroId,
  column,
  date,
  infos,
  setInfos,
}: MapClusterPcProps) => {
  const renderCount = useRenderCount();

  const defaultPlace: PlaceApiType = {
    addr1: metros.find((metro) => metro.areaCode === metroId)?.name || "",
    addr2: "",
    areacode: "",
    booktour: "",
    cat1: "",
    cat2: "",
    cat3: "",
    contentid: "",
    contenttypeid: "",
    cpyrhtDivCd: "",
    createdtime: "",
    firstimage: "",
    firstimage2: "",
    mapx: "",
    mapy: "",
    mlevel: "",
    modifiedtime: "",
    showflag: "",
    sigungucode: "",
    tel: "",
    title: metros.find((metro) => metro.areaCode === metroId)?.name || "",
    zipcode: "",
    overview: "",
    telname: "",
    homepage: "",
  };

  const [places, setPlaces] = useState<PlaceApiType[]>([defaultPlace]);

  console.log("렌더링", renderCount);

  useEffect(() => {
    const places = column.map((item) => item.place);
    setPlaces(places);
  }, [column]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("loading 확인", loading); 

      if (loading) return; // 이전 요청이 완료될 때까지 대기

      setLoading(true);

      try {
        kakao.maps.load(async () => {
          if (!places || places.length === 0) {
            setLoading(false);
            return;
          }

          const mapContainer = document.getElementById(
            `map-cluster-${date.toDateString()}`
          );
          if (!mapContainer) {
            setLoading(true);
            return;
          }

          const mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 6,
          };

          const positions = await getPositions(places);
          const map = new kakao.maps.Map(mapContainer, mapOption);

          // 최저 레벨 설정하기
          map.setMinLevel(7);

          var bounds = new kakao.maps.LatLngBounds();

          positions.forEach((position, index) => {
            const marker = new kakao.maps.Marker({
              map: map,
              position: position.latlng,
              title: position.title,
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
              content: `<div style="max-width:350px;text-align:center;padding:6px;">${
                index + 1
              }. ${position.title}</div>`,
            });
            infowindow.open(map, marker);
            bounds.extend(position.latlng);
          });

          const newInfos = [];
          for (let i = 0; i < positions.length - 1; i++) {
            const start = i;
            const end = i + 1;

            const info = await getCarDirection(
              positions[start].latlng,
              positions[end].latlng,
              map
            );

            newInfos.push(info);
          }

          if (JSON.stringify(newInfos) !== JSON.stringify(infos)) {
            setInfos(newInfos);
          }

          map.setBounds(bounds);
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [places, date]); 

  const getPositions = async (places: PlaceApiType[]) => {
    const positions: { title: string; latlng: kakao.maps.LatLng }[] = [];
    const geocoder = new kakao.maps.services.Geocoder();

    const addressToCoords = (
      addr: string
    ): Promise<kakao.maps.LatLng | null> => {
      return new Promise((resolve, reject) => {
        geocoder.addressSearch(addr, function (result, status) {
          if (status === kakao.maps.services.Status.OK && result[0]) {
            const coords = new kakao.maps.LatLng(
              Number(result[0].y),
              Number(result[0].x)
            );
            resolve(coords);
          } else {
            resolve(null);
          }
        });
      });
    };

    const promises = places.map((place) =>
      addressToCoords(place.addr1).then((coords) => {
        if (coords) {
          positions.push({
            title: place.title,
            latlng: coords,
          });
        }
      })
    );

    await Promise.all(promises);
    return positions;
  };

  return (
    <div
      className="map-cluster"
      id={`map-cluster-${date.toDateString()}`}
    ></div>
  );
};

export default MapClusterPc;
