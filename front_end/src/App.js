// App.js
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './AppContent'; // ⬅️ 아래에서 만들 파일

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
