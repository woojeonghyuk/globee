import React from 'react';
import { useNavigate } from 'react-router-dom';

// --- 디자인 (CSS-in-JS) ---
const containerStyle = { padding: '60px 20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' };
const menuButtonStyle = { 
  padding: '20px', 
  fontSize: '18px', 
  borderRadius: '12px', 
  border: '1px solid #ddd', 
  backgroundColor: '#f8f9fa', 
  cursor: 'pointer',
  marginBottom: '10px'
};

function MainPage() {
  const navigate = useNavigate();

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '30px' }}>GLOBEE 메인 메뉴</h2>
      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        <button style={menuButtonStyle} onClick={() => alert('외국인 컨텐츠 준비 중!')}>
          📦 난 외국인
        </button>
        <button style={menuButtonStyle} onClick={() => alert('한국 학생 찾기 준비 중!')}>
          🔍 난 학생
        </button>
        <button 
          style={{ ...menuButtonStyle, backgroundColor: '#eee', color: '#555' }} 
          onClick={() => navigate('/')}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default MainPage;