import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './component/Main';
import DisplayPage from './component/DisplayPage';

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
