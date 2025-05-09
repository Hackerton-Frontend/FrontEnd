import React from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function Main() {
  return (
    <Map
      center={{ lat: 36.361803, lng: 127.356542 }}
      style={{ width: "100vw", height: "100vh" }}
      level={3}
    >
      <MapMarker position={{ lat: 36.361803, lng: 127.356542 }}>
        <div style={{ padding: "5px", color: "#000" }}>현재 위치</div>
      </MapMarker>
    </Map>
  );
}