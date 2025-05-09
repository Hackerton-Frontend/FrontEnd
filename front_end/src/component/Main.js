import React, { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import "./Main.css"; // 알림 모달 스타일링을 위한 CSS 파일
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Main() {
  const [data, setData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const routeCoords = location.state?.route;
    setData(routeCoords);
    console.log(routeCoords, "✅ routeCoords received");
  }, [location.state]);
  console.log(data, "✅ data received");
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Map
        center={{ lat: 36.361803, lng: 127.356542 }}
        style={{ width: "100%", height: "100%" }}
        level={3}
      >
        <MapMarker position={{ lat: 36.361803, lng: 127.356542 }}>
          <div style={{ padding: "5px", color: "#000" }}>현재 위치</div>
        </MapMarker>
      </Map>

      {data && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "40vw",
            background: "white",
            border: "1px solid gray",
            borderRadius: "5px",
            padding: "10px",
            zIndex: 9999,
          }}
        >
          {(() => {
            const totalSeconds = Math.floor(data.eta.duration);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return (
              <>
                신고가 접수되었습니다. <br />
                경찰차 도착까지 {minutes}분 {seconds}초
              </>
            );
          })()}
        </div>
      )}
    </div>
  );

}