import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { FiRefreshCw } from "react-icons/fi"; // react-icons 라이브러리 사용

export default function Main() {
  const handleRefresh = () => {
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Map
        center={{ lat: 36.361803, lng: 127.356542 }}
        style={{ width: "100%", height: "100%", zIndex: 1 }} // 지도 zIndex 낮게 설정
        level={3}
      >
        <MapMarker position={{ lat: 36.361803, lng: 127.356542 }}>
          <div style={{ padding: "5px", color: "#000" }}>현재 위치</div>
        </MapMarker>
      </Map>

      {/* 새로고침 아이콘 */}
      <button
        onClick={handleRefresh}
        style={{
          position: "absolute",
          bottom: "17vh",
          right: "8vw",
          backgroundColor: "white",
          border: "none",
          borderRadius: "50%",
          width: "60px", // 버튼 크기 키움
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          zIndex: 9999, // 버튼 zIndex 높게 설정
        }}
      >
        <FiRefreshCw size={24} color="#000" />
      </button>
    </div>
  );
}