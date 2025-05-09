// ✅ SearchModal.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function SearchModal({ onClose }) {
  const [map, setMap] = useState(null)
  const navigate = useNavigate();
  const [kakaoReady, setKakaoReady] = useState(false);
  const [startPos] = useState({ lat: 36.3623, lng: 127.3563 });
  const [keyword, setKeyword] = useState('');
  const [destOptions, setDestOptions] = useState([]);
  const [selectedDest, setSelectedDest] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.kakao?.maps?.services) {
        setKakaoReady(true);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const searchNearbyPlaces = () => {
    if (!kakaoReady) {
      alert('카카오맵 API가 아직 로드되지 않았습니다.');
      return;
    }

    if (!keyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setDestOptions(data);
        } else {
          alert('검색 결과가 없습니다.');
        }
      },
      {
        location: new window.kakao.maps.LatLng(startPos.lat, startPos.lng),
        radius: 3000,
      }
    );
  };

  const handleRouteSearch = async () => {
    if (!selectedDest) {
      alert('목적지를 선택해주세요.');
      return;
    }

    try {
      const response = await axios.get('https://backend-0mut.onrender.com/api/route', {
        params: {
          startLat: startPos.lat,
          startLng: startPos.lng,
          endLat: selectedDest.y,
          endLng: selectedDest.x,
        },
      });

      const routeCoords = response.data;

      onClose();
      navigate('/displaypage', { state: { route: routeCoords } });
    } catch (err) {
      console.error('경로 요청 실패:', err);
      alert('경로 요청에 실패했습니다.');
    }
  };

  return (
    <ModalOverlay>
      <ModalBox>
        <Title>목적지 검색</Title>
        <InputRow>
          <SearchInput
            placeholder="목적지를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <SearchButton onClick={searchNearbyPlaces}>검색</SearchButton>
        </InputRow>

        <ResultList>
          {destOptions.map((item, idx) => (
            <ResultItem
              key={idx}
              onClick={() => {
                setSelectedDest(item);
                if (map) {
                  const moveLatLng = new window.kakao.maps.LatLng(item.y, item.x);
                  map.panTo(moveLatLng);  // ✅ 부드럽게 이동
                }
              }}
              selected={selectedDest?.id === item.id}
            >
              {item.place_name} ({item.address_name})
            </ResultItem>
          ))}
        </ResultList>

        <Map
          center={
            selectedDest
              ? { lat: parseFloat(selectedDest.y), lng: parseFloat(selectedDest.x) }
              : startPos
          }
          level={4}
          style={{ width: '100%', height: '300px', marginBottom: '16px' }}
          onCreate={map => setMap(map)}
        >
          <MapMarker position={startPos}>
            <div>출발지</div>
          </MapMarker>

          {destOptions.map((place, idx) => (
            <MapMarker
              key={idx}
              position={{ lat: parseFloat(place.y), lng: parseFloat(place.x) }}
              onClick={() => setSelectedDest(place)}
            >
              <div>{place.place_name}</div>
            </MapMarker>
          ))}
        </Map>

        <ButtonRow>
          <ActionButton onClick={handleRouteSearch}>경로 찾기</ActionButton>
          <CancelButton onClick={onClose}>닫기</CancelButton>
        </ButtonRow>
      </ModalBox>
    </ModalOverlay>
  );
}

export default SearchModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalBox = styled.div`
  background: white;
  width: 500px;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h2`
  margin-bottom: 16px;
  text-align: center;
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const SearchButton = styled.button`
  padding: 8px 16px;
  background: #2e8bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const ResultList = styled.ul`
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 16px;
`;

const ResultItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #eee;
  background: ${(props) => (props.selected ? '#e0f0ff' : 'white')};
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionButton = styled.button`
  background: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

const CancelButton = styled.button`
  background: #dc3545;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;
