import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// --- 1. 로그인 화면 ---
function LoginPage() {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (id.trim()) {
      alert(`${id}님, GLOBEE에 오신 것을 환영합니다!`);
      navigate('/main'); // 메인 화면으로 이동
    } else {
      alert('아이디를 입력해주세요.');
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#007bff' }}>GLOBEE</h1>
      <p>문화교류 화이팅
      </p>
      <div style={{ marginTop: '30px' }}>
        <input 
          type="text" 
          placeholder="아이디를 입력하세요" 
          value={id} 
          onChange={(e) => setId(e.target.value)}
          style={inputStyle}
        /><br />
        <button onClick={handleLogin} style={buttonStyle}>로그인</button>
      </div>
    </div>
  );
}

// --- 2. 메인 화면 ---
function MainPage() {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <h2>메인 메뉴</h2>
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        <button style={menuButtonStyle} onClick={() => alert('컨텐츠를 만들자')}>📦 난 외국인 </button>
        <button style={menuButtonStyle} onClick={() => alert('외국인을 찾자자')}>🔍 난 학생 </button>
        <button style={menuButtonStyle} onClick={() => navigate('/')}>로그아웃</button>
      </div>
    </div>
  );
}

// --- 디자인 (CSS-in-JS) ---
const containerStyle = { padding: '60px 20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' };
const inputStyle = { padding: '12px', width: '80%', maxWidth: '300px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ccc' };
const buttonStyle = { padding: '12px 40px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' };
const menuButtonStyle = { padding: '20px', fontSize: '18px', borderRadius: '12px', border: '1px solid #ddd', backgroundColor: '#f8f9fa', cursor: 'pointer' };

// --- 3. 앱 전체 구조 (라우팅 설정) ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;