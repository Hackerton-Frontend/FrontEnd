// App.js
import "./App.css";
import Header from "./component/Header";
import Main from "./component/Main"; // 경로 주의!
import { useKakaoLoader } from "react-kakao-maps-sdk";
import DisplayPage from './component/DisplayPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/displaypage" element={<DisplayPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
