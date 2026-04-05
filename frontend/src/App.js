import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StartPage from './pages/StartPage/StartPage';
import StLoginPage from './pages/StLoginPage/StLoginPage';
import TLoginPage from './pages/TLoginPage/TLoginPage';
import StMain from './Main/StMain/StMain';
import TMain from './Main/TMain/TMain';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/student-login" element={<StLoginPage />} />
        <Route path="/teacher-login" element={<TLoginPage />} />
        <Route path="/student-main" element={<StMain />} />
        <Route path="/teacher-main" element={<TMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;