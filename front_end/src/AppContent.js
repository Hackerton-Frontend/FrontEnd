// AppContent.js
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './component/Header';
import Main from './component/Main';
import DisplayPage from './component/DisplayPage';
import SosReportPage from './component/SosReportPage';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

export default function AppContent() {
  const location = useLocation();
  const [loading, error] = useKakaoLoader({
    appkey: 'cfd7264f6f0677bc208104d9cbc45701',
    libraries: ['services'],
  });

  const hideHeader = location.pathname === '/sosreport';

  if (loading) return <div>지도 로딩 중...</div>;
  if (error) return <div>에러: {String(error.message || error)}</div>;

  return (
    <div className="App">
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/displaypage" element={<DisplayPage />} />
        <Route path="/sosreport" element={<SosReportPage />} />
      </Routes>
    </div>
  );
}
