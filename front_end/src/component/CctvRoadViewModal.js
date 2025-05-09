// components/CctvRoadViewModal.js
import React from 'react';
import styled from 'styled-components';
import { Roadview } from 'react-kakao-maps-sdk';

function CctvRoadViewModal({ lat, lng, onClose }) {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton
            className="modal-close-btn"
            onClick={() => onClose()}
        >
            X
        </CloseButton>
        <h3>📷 CCTV 로드뷰</h3>
        <Roadview
          position={{
            lat: lat,
            lng: lng,
            radius: 50,
          }}
          style={{ width: "100%", height: "400px" }}
        />
      </ModalContent>
    </ModalOverlay>
  );
}

export default CctvRoadViewModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  text-align: center;
`;


const CloseButton = styled.div`
    position: absolute;
    top: 23vh;
    right: 2vh;
    width: 40px;
    height: 40px;
    background-color: #616161;
    color: white;
    border: none;
    border-radius: 50%;
    /* 동그라미 모양 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);

    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
`