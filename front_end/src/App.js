// App.js
import "./App.css";
import Main from "./component/Main";
import DisplayPage from './component/DisplayPage';
import Header from './component/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useKakaoLoader } from "react-kakao-maps-sdk";

function App() {
  const [loading, error] = useKakaoLoader({
    appkey: 'cfd7264f6f0677bc208104d9cbc45701', // .env에 저장된 키 사용
    libraries: ["services"],
  });

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/displaypage" element={<DisplayPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;