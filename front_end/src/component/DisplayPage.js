import React, { useEffect, useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useLocation } from "react-router-dom";
import CctvRoadViewModal from "./CctvRoadViewModal"; // 모달 컴포넌트 추가

function CCTVMap() {
  const [data, setData] = useState(null);
  const location = useLocation();

  const [selectedRouteType, setSelectedRouteType] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCctv, setSelectedCctv] = useState(null);

  const fastCount = data?.fastRoute?.cctvInfo?.count ?? 0;
  const fastDistance = data?.fastRoute?.distance ?? 0;

  const safeCount = data?.safeRoute?.cctvInfo?.count ?? 0;
  const safeDistance = data?.safeRoute?.distance ?? 0;

  useEffect(() => {
    const routeCoords = location.state?.route;
    setData(routeCoords);
    console.log(routeCoords, "✅ routeCoords received");
  }, [location.state]);

  const openModal = (cctv) => {
    setSelectedCctv(cctv);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCctv(null);
  };

  return (
    <>
      <Map
        center={{ lat: 36.361803, lng: 127.356542 }}
        style={{ width: "390px", height: "844px" }}
        level={4}
      >
        {/* CCTV 위치 마커 - 빠른 경로 */}
        {data?.fastRoute?.cctvInfo?.cctvLoc?.map((cctv, index) => (
          <MapMarker
            key={`fast-${index}`}
            position={{ lat: cctv.lat, lng: cctv.lng }}
            clickable={true}
            onClick={() => openModal(cctv)}
          />
        ))}

        {/* CCTV 위치 마커 - 안전 경로 */}
        {data?.safeRoute?.cctvInfo?.cctvLoc?.map((cctv, index) => (
          <MapMarker
            key={`safe-${index}`}
            position={{ lat: cctv.lat, lng: cctv.lng }}
            clickable={true}
            onClick={() => openModal(cctv)}
          />
        ))}

        {/* Polyline - 빠른 경로 */}
        {data?.fastRoute?.path && (
          <Polyline
            path={data.fastRoute.path.map(([lng, lat]) => ({ lat, lng }))}
            strokeWeight={4}
            strokeColor={
              selectedRouteType === null
                ? "#FF1493"
                : selectedRouteType === "fast"
                ? "#FF1493"
                : "#000000"
            }
            strokeOpacity={0.8}
            strokeStyle="solid"
          />
        )}

        {/* Polyline - 안전 경로 */}
        {data?.safeRoute?.path && (
          <Polyline
            path={data.safeRoute.path.map(([lng, lat]) => ({ lat, lng }))}
            strokeWeight={4}
            strokeColor={
              selectedRouteType === null
                ? "#ffd400"
                : selectedRouteType === "safe"
                ? "#ffd400"
                : "#000000"
            }
            strokeOpacity={0.8}
            strokeStyle="solid"
          />
        )}
      </Map>

      <div
        style={{
          position: "absolute",
          bottom: "1vh",
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
          boxSizing: "border-box",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
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
            backgroundColor: "#FFB6C1",
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
            backgroundColor: "#ffd400",
            lineHeight: "1.4",
          }}
        >
          🛡️ 안전한 경로<br />
          CCTV {safeCount}개 / {(safeDistance / 1000).toFixed(2)}km
        </button>
      </div>

      {modalOpen && selectedCctv && (
        <CctvRoadViewModal
          lat={selectedCctv.lat}
          lng={selectedCctv.lng}
          onClose={closeModal}
        />
      )}
    </>
  );
}

export default CCTVMap;
