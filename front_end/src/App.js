// App.js
import "./App.css";
import Main from "./component/Main"; // 경로 주의!
import { useKakaoLoader } from "react-kakao-maps-sdk";
import KakaoMapPage from './pages/Kakaomap';

function App() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAOMAP_KEY,
  });

  console.log(loading, error)
  return (
    <>
      <KakaoMapPage />   
    </>
  );
}

export default App;