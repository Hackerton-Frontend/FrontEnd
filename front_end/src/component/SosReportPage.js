import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

export default function SosReportPage() {
  const [sosList, setSosList] = useState([]);
  const [filter, setFilter] = useState('처리중'); // 기본값

  const fetchSosData = () => {
    axios.get('https://backend-0mut.onrender.com/api/sos')
      .then((res) => setSosList(res.data))
      .catch((err) => console.error('🚨 SOS 데이터 불러오기 실패:', err));
  };

  useEffect(() => {
    fetchSosData();
  }, []);

  const handleComplete = (timestamp) => {
  axios.patch(`https://backend-0mut.onrender.com/api/sos/${timestamp}/status`)
    .then(() => {
      alert("상태가 '처리완료'로 변경되었습니다.");
      fetchSosData(); // 갱신
    })
    .catch((err) => {
      console.error("❌ 상태 변경 실패:", err);
      alert("상태 변경 중 오류가 발생했습니다.");
    });
};


  const filteredList = sosList.filter((sos) => sos.status === filter);

  console.log(sosList);

  return (
    <Container>
      <Title>📍 신고 리스트</Title>
      
      <FilterButtons>
        <FilterButton isActive={filter === '처리중'} onClick={() => setFilter('처리중')}>
          처리중
        </FilterButton>
        <FilterButton isActive={filter === '처리완료'} onClick={() => setFilter('처리완료')}>
          처리완료
        </FilterButton>
      </FilterButtons>

      <CardGrid>
      {filteredList.map((sos, idx) => (
        <Card key={idx}>
          <h3>{sos.name}</h3>
          <p><strong>주민번호:</strong> {sos.rrn}</p>
          <p><strong>전화번호:</strong> {sos.phone}</p>
          <p><strong>신고 내용:</strong> {sos.situation}</p>
          <p><strong>신고 시각:</strong> {new Date(sos.timestamp).toLocaleString()}</p>
          <p><strong>예상 도착시간:</strong> {sos.eta.duration.toFixed(1)}초</p>
          <p><strong>거리:</strong> {(sos.eta.distance / 1000).toFixed(2)} km</p>

          {sos.status === '처리중' ? (
            <DeleteButton onClick={() => handleComplete(sos.timestamp)}>
              상황종료
            </DeleteButton>
          ) : (
            <DoneButton disabled>완료됨</DoneButton>
          )}
        </Card>
      ))}
    </CardGrid>

    </Container>
  );
}

// Styled Components
const Container = styled.div`
  padding: 40px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 24px;
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  background: ${props => (props.isActive ? '#2e8bff' : '#ddd')};
  color: ${props => (props.isActive ? 'white' : 'black')};
  cursor: pointer;

  &:hover {
    background: ${props => (props.isActive ? '#1c6ed8' : '#ccc')};
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
  }
`;

const DeleteButton = styled.button`
  margin-top: 12px;
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #bb2d3b;
  }
`;

const DoneButton = styled.button`
  margin-top: 12px;
  background: #aaa;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: bold;
  cursor: not-allowed;
  opacity: 0.8;
`;
