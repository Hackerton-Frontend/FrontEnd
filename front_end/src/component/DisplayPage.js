import React, { useEffect, useState } from "react";
import axios from "axios";
import { useKakaoLoader, Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useLocation } from "react-router-dom";

function CCTVMap() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAOMAP_KEY,
  });
  const [data,setData] = useState()

  const location = useLocation();
  useEffect(() => {
    const routeCoords = location.state?.routeCoords;
    setData(routeCoords);
    console.log(data,"test");
  },[data])

  const [cctvs, setCctvs] = useState();


  if (loading) return <div>지도를 불러오는 중입니다...</div>;
  if (error) return <div>지도를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <>
      <Map
        center={{ lat: 36.361803, lng: 127.356542 }}
        style={{ width: "390px", height: "844px" }}
        level={6}
      >

        {/* CCTV 위치 표시 */}
        {data && data.fastRoute.cctvInfo.cctvLoc.map((cctv, index) => (
            <MapMarker
                key={`${cctv.address}-${index}`}
                position={{ lat: cctv.lat, lng: cctv.lng }}
                clickable={true}
            >
            </MapMarker>
        ))}

        {/* CCTV 위치 표시 */}
        {data && data.safeRoute.cctvInfo.cctvLoc.map((cctv, index) => (
            <MapMarker
                key={`${cctv.address}-${index}`}
                position={{ lat: cctv.lat, lng: cctv.lng }}
                clickable={true}
            >
            </MapMarker>
        ))}

        {/* CCTV 위치를 선으로 연결 */}
        {data && (
            <Polyline
                path={data.fastRoute.path.map(data => ({
                    lat: data[1],
                    lng: data[0]
                }))}
                strokeWeight={3}
                strokeColor={"#0067A3"}
                strokeOpacity={0.8}
                strokeStyle={"solid"}
            />
        )}

        {/* CCTV 위치를 선으로 연결 */}
        {data && (
            <Polyline
                path={data.safeRoute.path.map(data => ({
                    lat: data[1],
                    lng: data[0]
                }))}
                strokeWeight={3}
                strokeColor={"#000000"}
                strokeOpacity={0.8}
                strokeStyle={"solid"}
            />
        )}

      </Map>
    {

    }

    </>
  );
}

export default CCTVMap;
