import React, { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useLocation } from "react-router-dom";

function CCTVMap() {
  const [data, setData] = useState(null);
  const location = useLocation();

  const [selectedRouteType, setSelectedRouteType] = useState("fast");
  const selectedRoute = data?.[selectedRouteType + "Route"];

  const fastCount = data?.fastRoute?.cctvInfo?.count ?? 0;
  const fastDistance = data?.fastRoute?.distance ?? 0;
  
  const safeCount = data?.safeRoute?.cctvInfo?.count ?? 0;
  const safeDistance = data?.safeRoute?.distance ?? 0;
  
  useEffect(() => {
    const routeCoords = location.state?.route;
    setData(routeCoords);
    console.log(routeCoords, "✅ routeCoords received");
  }, [location.state]);

  return (
    <>
      <Map
        center={{ lat: 36.361803, lng: 127.356542 }}
        style={{ width: "390px", height: "844px" }}
        level={6}
      >
        {/* CCTV 위치 마커 - 빠른 경로 */}
        {data?.fastRoute?.cctvInfo?.cctvLoc?.map((cctv, index) => (
          <MapMarker
            key={`fast-${cctv.address}-${index}`}
            position={{ lat: cctv.lat, lng: cctv.lng }}
            clickable={true}
          />
        ))}

        {/* CCTV 위치 마커 - 안전 경로 */}
        {data?.safeRoute?.cctvInfo?.cctvLoc?.map((cctv, index) => (
          <MapMarker
            key={`safe-${cctv.address}-${index}`}
            position={{ lat: cctv.lat, lng: cctv.lng }}
            clickable={true}
          />
        ))}

        {/* 경로 선 - 빠른 경로 */}
        {data?.fastRoute?.path && (
          <Polyline
            path={data.fastRoute.path.map(([lng, lat]) => ({ lat, lng }))}
            strokeWeight={3}
            strokeColor="#0067A3"
            strokeOpacity={0.8}
            strokeStyle="solid"
          />
        )}

        {/* 경로 선 - 안전 경로 */}
        {data?.safeRoute?.path && (
          <Polyline
            path={data.safeRoute.path.map(([lng, lat]) => ({ lat, lng }))}
            strokeWeight={3}
            strokeColor="#000000"
            strokeOpacity={0.8}
            strokeStyle="solid"
          />
        )}
      </Map>

    {
        
        <div
        style={{
          position: "absolute",      // ✅ 지도 내부 하단에 고정
          bottom: "140px",
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
          boxSizing: "border-box",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // ✅ 배경 반투명
          borderTop: "1px solid #ddd",
        }}
      >
        <button
          onClick={() => setSelectedRouteType("fast")}
          style={{
            width: "160px",
            whiteSpace: "normal",
            textAlign: "center",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: selectedRouteType === "fast" ? "#e6f0ff" : "#fff",
            fontWeight: selectedRouteType === "fast" ? "bold" : "normal",
            lineHeight: "1.4",
          }}
        >
          🚀 빠른 경로<br />
          CCTV {fastCount}개 / {(fastDistance / 1000).toFixed(2)}km
        </button>
      
        <button
          onClick={() => setSelectedRouteType("safe")}
          style={{
            width: "160px",
            whiteSpace: "normal",
            textAlign: "center",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            backgroundColor: selectedRouteType === "safe" ? "#e6ffe6" : "#fff",
            fontWeight: selectedRouteType === "safe" ? "bold" : "normal",
            lineHeight: "1.4",
          }}
        >
          🛡️ 안전한 경로<br />
          CCTV {safeCount}개 / {(safeDistance / 1000).toFixed(2)}km
        </button>
      </div>
      
   

    }
      

    </>
  );
}

export default CCTVMap;
