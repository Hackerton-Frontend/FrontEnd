import React, { useState, useEffect } from "react";
import logo from "../data/logo.png";
import SosModal from "../modal/SosModal";
import SearchModal from "../modal/SearchModal";

export default function Header() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSosdalOpen, setIsSosModalOpen] = useState(false);
  const [hovered, setHovered] = useState({ sos: false, search: false });

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @font-face {
        font-family: 'Ownglyph_ParkDaHyun';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2411-3@1.0/Ownglyph_ParkDaHyun.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
  }, []);

  const handleSOSClick = () => setIsSosModalOpen(true);
  const handleSearchClick = () => setIsSearchModalOpen(true);

  const getButtonStyle = (isHovered) => ({
    width: "90px",
    height: "40px",
    fontSize: "16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    border: "2px solid blue", // ✅ 파란색 테두리
    backgroundColor: isHovered ? "lightgray" : "white", // ✅ hover 시 회색 배경
    color: isHovered ? "white" : "blue", // ✅ hover 시 글자색 흰색
    fontWeight: "bold",
    cursor: "pointer",
    fontFamily: "Ownglyph_ParkDaHyun",
    boxShadow: isHovered
      ? "0 6px 12px rgba(0, 0, 0, 0.25)"
      : "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "all 0.2s ease-in-out",
  });

  return (
    <div
      style={{
        fontFamily: "Ownglyph_ParkDaHyun",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "100vw",
          background: "linear-gradient(to right, rgb(71, 178, 205), rgb(189, 229, 238))",
          borderRadius: "0 0 20px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            color: "white",
            padding: "15px 0",
          }}
        >
          안심 귀가 길 서비스
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 20px",
            boxSizing: "border-box",
          }}
        >
          <button
            onClick={handleSOSClick}
            onMouseEnter={() => setHovered({ ...hovered, sos: true })}
            onMouseLeave={() => setHovered({ ...hovered, sos: false })}
            style={getButtonStyle(hovered.sos)}
          >
            🚨 SOS
          </button>

          <img
            src={logo}
            alt="Logo"
            style={{ width: "60px", height: "60px" }}
          />

          <button
            onClick={handleSearchClick}
            onMouseEnter={() => setHovered({ ...hovered, search: true })}
            onMouseLeave={() => setHovered({ ...hovered, search: false })}
            style={getButtonStyle(hovered.search)}
          >
            🔍 Search
          </button>
        </div>
      </div>

      {isSosdalOpen && <SosModal onClose={() => setIsSosModalOpen(false)} />}
      {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} />}
    </div>
  );
}
