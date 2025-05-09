import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useLocation } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import "./Main.css";

export default function Main() {
  const [data, setData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const routeCoords = location.state?.route;
    setData(routeCoords);
    console.log(routeCoords, "✅ routeCoords received");
  }, [location.state]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const renderETA = () => {
    if (!data?.eta) return null;

    const totalSeconds = Math.floor(data.eta.duration);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
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
        신고가 접수되었습니다. <br />
        경찰차 도착까지 {minutes}분 {seconds}초
      </div>
    );
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Map
        center={{ lat: 36.361803, lng: 127.356542 }}
        style={{ width: "100%", height: "100%", zIndex: 1 }}
        level={3}
      >
        <MapMarker position={{ lat: 36.361803, lng: 127.356542 }}>
          <div style={{ padding: "5px", color: "#000" }}>현재 위치</div>
        </MapMarker>
      </Map>

      {renderETA()}

      <button
        onClick={handleRefresh}
        style={{
          position: "absolute",
          bottom: "23vh",
          right: "8vw",
          backgroundColor: "white",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          zIndex: 999,
        }}
      >
        <FiRefreshCw size={24} color="#000" />
      </button>
    </div>
  );
}
