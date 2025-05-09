// component/Header.js
import React,{useState} from "react";
import logo from "../data/logo.png"; // 로고 이미지 경로
import SosModal from "../modal/SosModal";
import SearchModal from '../modal/SearchModal';

export default function Header() {
    const [showSos, setShowSos] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const handleSOSClick = () => {
        setShowSos(true);
    };

    const handleSearchClick = () => {
        setIsSearchModalOpen(true);
    };

    return (
        <div style={{
            width:"100vw",
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"
        }}>
            <div style={{
                backgroundColor: "orange",
                fontSize: "20px",
                fontWeight: "bold",
                textShadow: "1px 1px 1px black",  
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                marginLeft:"-3vw", 
                width:"100vw"
            }}>
                안심 귀가 길 서비스
            </div>
            <div style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 20px",
                width:"100vw",        // ✅ 전체 앱 너비 제한
                margin: "0 auto",           // ✅ 중앙 정렬
                backgroundColor: "orange",
                borderBottom: "1px solid #ccc",
            }}>

                <button onClick={handleSOSClick} style={{ width: "90px", height: "40px", fontSize: "12px", display: "flex", alignItems: "rows", justifyContent: "center", alignItems: "center", marginLeft: "3vw" }}>
                    🚨 SOS
                </button>
                <img src={logo} alt="Logo" style={{ width: "60px", height: "60px", marginLeft: "8vw" }} />
                <button onClick={handleSearchClick} style={{ width: "90px", height: "40px", fontSize: "12px", display: "flex", alignItems: "rows", justifyContent: "center", alignItems: "center", marginLeft: "9vw" }}>
                    🔍 Search
                </button>
            </div>
            {/* 모달 렌더링 */}
            {showSos && <SosModal onClose={() => setShowSos(false)} />}
            {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} />}
        </div>
    );
}
