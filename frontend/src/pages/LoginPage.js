import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // 로고 이미지 불러오기

// --- 디자인 (CSS-in-JS) ---
// 1. 전체 배경 (연한 회색)
const backgroundStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#f9f9f9',
  fontFamily: "'Noto Sans KR', sans-serif",
  opacity: 1,
  transition: 'opacity 0.5s ease-in', // 로그인 화면 나타날 때 페이드 인
};

// 2. 스플래시 전용 스타일 (페이드 아웃 효과 추가)
const splashStyle = {
  position: 'absolute', // 로그인 화면 위에 띄움
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100%',
  backgroundColor: '#fff',
  zIndex: 10, // 가장 위에 오도록
  transition: 'opacity 0.8s ease-out', // 은은하게 사라지는 핵심 속성
};

// 3. 중앙 하얀색 로그인 박스
const loginBoxStyle = {
  backgroundColor: 'white',
  padding: '60px 50px',
  borderRadius: '15px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  width: '100%',
  maxWidth: '400px',
  textAlign: 'center',
};

// --- 나머지 스타일은 동일 (생략 가능하나 가독성을 위해 유지) ---
const titleStyle = { fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '50px', color: '#333' };
const formGroupStyle = { textAlign: 'left', marginBottom: '20px' };
const labelStyle = { display: 'block', fontSize: '14px', color: '#666', marginBottom: '8px', fontWeight: '500' };
const inputStyle = { width: '100%', padding: '15px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box', outline: 'none' };
const autoLoginStyle = { display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '8px', marginBottom: '30px', fontSize: '14px', color: '#7７7' };
const buttonStyle = { width: '100%', padding: '18px', backgroundColor: '#FFF9C4', color:'#333', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' };
const footerLinkStyle = { marginTop: '25px', fontSize: '13px', color: '#888', lineHeight: '1.6' };

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // --- 스플래시 상태 관리 (업그레이드) ---
  const [showSplash, setShowSplash] = useState(true); // 스플래시 존재 여부
  const [isFading, setIsFading] = useState(false);   // 페이드 아웃 애니메이션 중인지 여부
  const navigate = useNavigate();

  // --- 스플래시 은은하게 사라지는 로직 ---
  useEffect(() => {
    // 1단계: 로고를 보여주는 시간 (1.5초)
    const showTimer = setTimeout(() => {
      setIsFading(true); // 1.5초 후 페이드 아웃 애니메이션 시작
    }, 800);

    // 2단계: 애니메이션이 지속되는 시간 (0.8초) 후 최종 제거
    const fadeTimer = setTimeout(() => {
      setShowSplash(false); // 애니메이션이 끝난 후 스플래시 화면 완전히 제거
    }, 800 + 800); // 1.5초(보여줌) + 0.8초(애니메이션)

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      alert(`환영합니다!`);
      navigate('/main');
    } else {
      alert('이메일과 비밀번호를 입력해주세요.');
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* 1단계: 로고 화면 (스플래시) */}
      {showSplash && (
        <div style={{ ...splashStyle, opacity: isFading ? 0 : 1 }}>
          <img src={logo} alt="GLOBEE 로고" style={{ width: '180px', marginBottom: '20px' }} />
          <h2 style={{ color: '#333', fontWeight: 'bold' }}>GLOBEE</h2>
        </div>
      )}

      {/* 2단계: 로그인 화면 (스플래시가 사라질 때쯤 자연스럽게 나타남) */}
      <div style={{ ...backgroundStyle, opacity: showSplash ? 0 : 1 }}>
        <div style={loginBoxStyle}>
          <h1 style={titleStyle}>LOGIN</h1>
          
          <form onSubmit={handleLogin}>
            <div style={formGroupStyle}>
              <label style={labelStyle}>이메일</label>
              <input 
                type="email" 
                placeholder="이메일을 입력하세요" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>비밀번호</label>
              <input 
                type="password" 
                placeholder="비밀번호를 입력하세요" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                required
              />
            </div>

            <div style={autoLoginStyle}>
              <input type="checkbox" id="autoLogin" style={{cursor: 'pointer'}} />
              <label htmlFor="autoLogin" style={{cursor: 'pointer'}}>자동 로그인</label>
            </div>

            <button type="submit" style={buttonStyle}>로그인</button>
          </form>

          <div style={footerLinkStyle}>
            <span style={{cursor: 'pointer'}}>비밀번호 찾기</span><br />
            <span style={{marginTop: '10px', display: 'inline-block'}}>
              아직 가입하지 않으셨나요? 
              <span style={{color: '#333', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5px'}}>
                이메일로 회원가입하기
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;