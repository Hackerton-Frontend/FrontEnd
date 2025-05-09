import React, { useEffect, useState } from "react";
import axios from "axios";
import { useKakaoLoader, Map, MapMarker, Polyline } from "react-kakao-maps-sdk";

function CCTVMap() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAOMAP_KEY,
  });
  const [cctvs, setCctvs] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend-0mut.onrender.com/api/cctv")
      .then((res) => {
        console.log("📦 API 응답:", res.data);
        if (Array.isArray(res.data.cctvs)) {
          setCctvs(res.data.cctvs);
        } else {
          console.error("❌ 예상치 못한 응답 구조:", res.data);
          setCctvs([]); // fallback
        }
      })
      .catch((err) => {
        console.error("CCTV 불러오기 실패:", err);
      });
  }, []);
  

  if (loading) return <div>지도를 불러오는 중입니다...</div>;
  if (error) return <div>지도를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <>
      <Map
        center={{ lat: 36.361803, lng: 127.356542 }}
        style={{ width: "390px", height: "844px" }}
        level={15}
      >

        {/* CCTV 위치 표시 */}
        {Array.isArray(cctvs) && cctvs.slice(0, 20).map((cctv, index) => (
            <MapMarker
            key={`${cctv.address}-${index}`}
            position={{ lat: cctv.lat, lng: cctv.lng }}
            clickable={true}
            >
            <div style={{ padding: "5px", color: "#000" }}>{cctv.address}</div>
            </MapMarker>
        ))}
        {/* CCTV 위치를 선으로 연결 */}
        {Array.isArray(cctvs) && (
            <Polyline
            path={cctvs.slice(0, 20).map(cctv => ({
                lat: cctv.lat,
                lng: cctv.lng
            }))}
            strokeWeight={5}
            strokeColor={"#FF0000"}
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
