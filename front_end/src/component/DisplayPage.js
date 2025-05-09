// CCTVMap.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Map, MapMarker } from "react-kakao-maps-sdk";

function CCTVMap() {
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

  
}

export default CCTVMap;