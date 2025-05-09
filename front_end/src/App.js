// App.js
import "./App.css";
import Header from "./component/Header";
import Main from "./component/Main"; // 경로 주의!
import { useKakaoLoader } from "react-kakao-maps-sdk";

function App() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAOMAP_KEY,
  });

  if (loading) return <div>지도를 불러오는 중입니다...</div>;
  if (error) return <div>지도 로딩 에러: {String(error)}</div>;

  return (
    <div className="App">
      <Header />
      <Main />

    </div>
  );
}

export default App;