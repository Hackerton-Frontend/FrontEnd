// component/Header.js
import React,{useState} from "react";
import logo from "../data/logo.png"; // 로고 이미지 경로
import SerachModal from "../modal/SearchModal";
import SosModal from "../modal/SosModal";

export default function Header() {
    const [showSos, setShowSos] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const handleSOSClick = () => {
        setShowSos(true);
    };

    const handleSearchClick = () => {
        setShowSearch(true);
    };

    return (
        <div>
            <div style={{
                backgroundColor: "orange",
                fontSize: "20px",
                fontWeight: "bold",
                textShadow: "1px 1px 1px black"
            }}>
                안심 귀가 길 서비스
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 20px",
                maxWidth: "400px",         // ✅ 전체 앱 너비 제한
                margin: "0 auto",           // ✅ 중앙 정렬
                backgroundColor: "orange",
                borderBottom: "1px solid #ccc",
            }}>

                <button onClick={handleSOSClick} style={{ width: "90px", height: "40px", fontSize: "12px", display: "flex", alignItems: "rows", justifyContent: "center", alignItems: "center", marginLeft: "4%" }}>
                    🚨 SOS
                </button>
                <img src={logo} alt="Logo" style={{ width: "60px", height: "60px", marginLeft: "10%" }} />
                <button onClick={handleSearchClick} style={{ width: "90px", height: "40px", fontSize: "12px", display: "flex", alignItems: "rows", justifyContent: "center", alignItems: "center", marginLeft: "11%" }}>
                    🔍 Search
                </button>
            </div>
            {/* 모달 렌더링 */}
            {showSos && <SosModal onClose={() => setShowSos(false)} />}
            {showSearch && <SerachModal onClose={() => setShowSearch(false)} />}
        </div>
    );
}
