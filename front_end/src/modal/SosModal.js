import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // axios를 import
import './SosModal.css';
import Drunk from "../data/Drunk.png";
import Harassment from "../data/Harassment.png";
import Knife from "../data/Knife.png";
import Stalking from "../data/Stalking.png";

const SosModal = ({ onClose }) => {
    const modalBackground = useRef();

    // Close modal on ESC key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleBackgroundClick = (e) => {
        if (e.target === modalBackground.current) {
            onClose();
        }
    };

    // "흉기 든 괴한" 버튼 클릭 시 데이터 전송
    const handleSendData = async (situation) => {
        const requestData = {
            lat: 36.361349,
            lng: 127.344596,
            name: "양희승",
            rrn: "030331-1234567",
            phone: "010-4669-2902",
            situation: situation
        };

        try {
            const postResponse = await axios.post('https://backend-0mut.onrender.com/api/sos', requestData);
            console.log('POST Response:', postResponse.data); // POST 성공 시 응답 데이터 출력

            // GET 요청으로 데이터 가져오기
            const getResponse = await axios.get('https://backend-0mut.onrender.com/api/sos');
            console.log('GET Response:', getResponse.data); // GET 성공 시 응답 데이터 출력

            // 가장 최근 데이터 가져오기
            const latestData = getResponse.data[getResponse.data.length - 1];

            // Alert로 데이터 표시
            alert(
                `ETA: ${latestData.eta.duration}초,
                거리: ${latestData.eta.distance}m,
                상황: ${latestData.situation},
                신고자: ${latestData.name},
                신고자 전화번호: ${latestData.phone},
                신고자 주민등록번호: ${latestData.rrn}`
            );

            onClose();
        } catch (error) {
            console.error('Error:', error); // 에러 발생 시 출력
            alert('데이터 전송 또는 수신 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            {(
                <div
                    className="modal-overlay"
                    ref={modalBackground}
                    onClick={handleBackgroundClick}
                >
                    <div className="modal-content">
                        <div className="modal">
                            <span role="img" aria-label="siren">🚨</span>
                            SOS
                            <span role="img" aria-label="siren">🚨</span>
                        </div>
                        <button
                            className="modal-close-btn"
                            onClick={() => onClose()}
                        >
                            X
                        </button>
                        <div className="button-container">
                            <button className="modal-button" onClick={() => handleSendData("스토킹")}>
                                <img
                                    className="icon"
                                    src={Stalking}
                                    alt="Stalking icon"
                                />
                                스토킹
                            </button>
                            <button
                                className="modal-button" onClick={() => handleSendData("성추행")}>
                                <img
                                    className="icon"
                                    src={Harassment}
                                    alt="Harassment icon"
                                />
                                성추행
                            </button>
                            <button className="modal-button" onClick={() => handleSendData("흉기 든 남성이 따라오고 있음")}>
                                <img
                                    className="icon"
                                    src={Knife}
                                    alt="Knife icon"
                                />
                                흉기 든 괴한
                            </button>
                            <button className="modal-button" onClick={() => handleSendData("취객의 시비")}>
                                <img
                                    className="icon"
                                    src={Drunk}
                                    alt="Drunk icon"
                                />
                                취객의 시비
                            </button>
                        </div>
                        <div className="modal-text">
                            ※주의※ 머시깽이 할 시 법적 처벌을 받을 수 있습니다.
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SosModal;