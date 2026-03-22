import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // 로고 이미지 불러오기

// --- 디자인 (CSS-in-JS) ---
const splashContainerStyle = { 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  height: '100vh', 
  backgroundColor: '#fff', 
  transition: 'opacity 0.5s ease-out' 
};
const loginContainerStyle = { padding: '80px 20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' };
const inputStyle = { padding: '15px', width: '80%', maxWidth: '300px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd' };
const buttonStyle = { padding: '15px 50px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' };

function LoginPage() {
  const [id, setId] = useState('');
  const [showSplash, setShowSplash] = useState(true); // 스플래시 상태 관리
  const navigate = useNavigate();

  // --- 스플래시 스크린 로직 ---
  useEffect(() => {
    // 2.5초 후에 로그인 화면으로 전환
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => clearTimeout(timer); // 메모리 누수 방지
  }, []);

  const handleLogin = () => {
    if (id.trim()) {
      alert(`${id}님, 문화교류를 시작해 볼까요?`);
      navigate('/main');
    } else {
      alert('아이디를 입력해주세요.');
    }
  };

  // --- 1단계: 스플래시 로고 화면 ---
  if (showSplash) {
    return (
      <div style={splashContainerStyle}>
        <img src={logo} alt="GLOBEE 로고" style={{ width: '150px' }} />
      </div>
    );
  }

  // --- 2단계: 로그인 화면 ---
  return (
    <div style={loginContainerStyle}>
      <img src={logo} alt="GLOBEE 로고" style={{ width: '80px', marginBottom: '20px' }} />
      <h1 style={{ color: '#333', marginBottom: '5px' }}>GLOBEE</h1>
      <p style={{ color: '#777', marginBottom: '40px' }}>문화교류 화이팅! 🌏</p>
      
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

export default LoginPage;