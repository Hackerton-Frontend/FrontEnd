// CCTVMap.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useKakaoLoader } from "react-kakao-maps-sdk";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function CCTVMap() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAOMAP_KEY,
  });
  const [cctvs, setCctvs] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend-0mut.onrender.com/api/cctv")
      .then((res) => {
        console.log(res.data);
        setCctvs(res.data);
      })
      .catch((err) => {
        console.error("CCTV 불러오기 실패:", err);
      });
  }, []);

  console.log(loading, error)

  return ( 
    <>
        <Map
            // 카카오맵 API 키를 사용하여 맵을 초기화합니다.
            center={{ lat: 35.871183, lng: 128.601599 }}
            style={{ width: "390px", height: "844px" }}
            level={3}
        >
        {/* CCTV 마커들 표시 */}
</Map>
    </>
  )

  
}

export default CCTVMap;