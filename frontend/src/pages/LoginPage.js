import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);

  const [showSplash, setShowSplash] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsFading(true);
    }, 1100);

    const fadeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2300);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    navigate('/main');
  };

  return (
    <div style={pageStyle}>
      <div style={backgroundGlowTop} />
      <div style={backgroundGlowBottom} />

      {showSplash && (
        <div
          style={{
            ...splashStyle,
            opacity: isFading ? 0 : 1,
          }}
        >
          <div style={splashLogoWrapperStyle}>
            <img src={logo} alt="Globee 로고" style={splashLogoStyle} />
          </div>
          <h1 style={splashTitleStyle}>GLOBEE</h1>
          <p style={splashSubtitleStyle}>
            외국인 학생과 지역 학생을 연결하는 문화 플랫폼
          </p>
        </div>
      )}

      <div style={contentWrapStyle}>
        <section style={heroSectionStyle}>
          <div style={logoWrapperStyle}>
            <img src={logo} alt="Globee 로고" style={logoStyle} />
          </div>

          <div style={badgeStyle}>GLOBEE</div>

          <h1 style={titleStyle}>
            외국인 학생과
            <br />
            지역 학생을 연결하는
            <br />
            문화 플랫폼
          </h1>

          <p style={descriptionStyle}>
            대학의 빈 강의실과 외국인 학생의 문화 콘텐츠를 연결해,
            <br />
            누구나 캠퍼스에서 새로운 문화를 배우고 경험할 수 있도록 돕습니다.
          </p>

          <div style={featureListStyle}>
            <div style={featureItemStyle}>🌍 캠퍼스 기반 문화교류</div>
            <div style={featureItemStyle}>🏫 유휴공간 활용 클래스</div>
            <div style={featureItemStyle}>🤝 외국인 학생 · 지역 학생 연결</div>
          </div>
        </section>

        <section style={loginAreaStyle}>
          <div style={loginCardStyle}>
            <div style={loginHeaderStyle}>
              <h2 style={loginTitleStyle}>시작하기</h2>
              <p style={loginSubTextStyle}>
                GLOBEE에 로그인하고 문화교류를 시작해보세요
              </p>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>이메일</label>
              <input
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

            <label style={checkboxRowStyle}>
              <input
                type="checkbox"
                checked={autoLogin}
                onChange={(e) => setAutoLogin(e.target.checked)}
                style={checkboxStyle}
              />
              자동 로그인
            </label>

            <button onClick={handleLogin} style={loginButtonStyle}>
              로그인
            </button>

            <button onClick={() => navigate('/main')} style={guestButtonStyle}>
              둘러보기
            </button>

            <div style={bottomTextWrapStyle}>
              <p style={bottomTextStyle}>아직 가입하지 않으셨나요?</p>
              <p style={signupTextStyle}>이메일로 회원가입하기</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;

/* ---------------- styles ---------------- */

const pageStyle = {
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, #FFFDF2 0%, #FFFDF5 100%)',
  fontFamily:
    '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const backgroundGlowTop = {
  position: 'absolute',
  top: '-180px',
  left: '-180px',
  width: '420px',
  height: '420px',
  borderRadius: '50%',
  background: 'rgba(255, 249, 196, 0.85)',
  filter: 'blur(70px)',
  pointerEvents: 'none',
};

const backgroundGlowBottom = {
  position: 'absolute',
  right: '-160px',
  bottom: '-180px',
  width: '420px',
  height: '420px',
  borderRadius: '50%',
  background: 'rgba(255, 249, 196, 0.65)',
  filter: 'blur(80px)',
  pointerEvents: 'none',
};

const contentWrapStyle = {
  position: 'relative',
  zIndex: 1,
  maxWidth: '1280px',
  minHeight: '100vh',
  margin: '0 auto',
  padding: '48px 56px',
  display: 'grid',
  gridTemplateColumns: '1.1fr 0.9fr',
  alignItems: 'center',
  gap: '56px',
};

const heroSectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const logoWrapperStyle = {
  width: '108px',
  height: '108px',
  borderRadius: '28px',
  backgroundColor: '#FFF9C4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 18px 40px rgba(0, 0, 0, 0.08)',
  marginBottom: '24px',
};

const logoStyle = {
  width: '78px',
  height: '78px',
  objectFit: 'contain',
};

const badgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  padding: '10px 16px',
  borderRadius: '999px',
  backgroundColor: '#FFF3A6',
  color: '#152238',
  fontSize: '14px',
  fontWeight: '800',
  marginBottom: '22px',
};

const titleStyle = {
  margin: 0,
  fontSize: '68px',
  lineHeight: '1.08',
  letterSpacing: '-0.04em',
  fontWeight: 900,
  color: '#17233A',
};

const descriptionStyle = {
  marginTop: '26px',
  marginBottom: '32px',
  fontSize: '17px',
  lineHeight: '1.75',
  color: '#667085',
};

const featureListStyle = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
};

const featureItemStyle = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #F0F0F0',
  borderRadius: '18px',
  padding: '14px 18px',
  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.05)',
  fontSize: '14px',
  fontWeight: '700',
  color: '#22304A',
};

const loginAreaStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const loginCardStyle = {
  width: '100%',
  maxWidth: '500px',
  minHeight: '680px',
  backgroundColor: '#FFFFFF',
  borderRadius: '32px',
  padding: '68px 34px 40px',
  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(0, 0, 0, 0.04)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
};

const loginHeaderStyle = {
  marginBottom: '34px',
};

const loginTitleStyle = {
  margin: 0,
  fontSize: '34px',
  lineHeight: '1.2',
  fontWeight: 900,
  color: '#17233A',
};

const loginSubTextStyle = {
  marginTop: '10px',
  marginBottom: 0,
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#6B7280',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '18px',
};

const labelStyle = {
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: '800',
  color: '#273449',
};

const inputStyle = {
  width: '100%',
  height: '56px',
  borderRadius: '16px',
  border: '1px solid #E8E8E8',
  backgroundColor: '#FCFCFC',
  padding: '0 16px',
  fontSize: '15px',
  color: '#1F2937',
  outline: 'none',
};

const checkboxRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '24px',
  fontSize: '14px',
  color: '#4B5563',
  cursor: 'pointer',
};

const checkboxStyle = {
  width: '16px',
  height: '16px',
};

const loginButtonStyle = {
  width: '100%',
  height: '56px',
  border: 'none',
  borderRadius: '18px',
  backgroundColor: '#FFF3A6',
  color: '#14233C',
  fontSize: '18px',
  fontWeight: 900,
  cursor: 'pointer',
  boxShadow: '0 10px 24px rgba(255, 243, 166, 0.45)',
  marginBottom: '14px',
};

const guestButtonStyle = {
  width: '100%',
  height: '54px',
  borderRadius: '18px',
  border: '1px solid #E5E7EB',
  backgroundColor: '#FFFFFF',
  color: '#344054',
  fontSize: '16px',
  fontWeight: 800,
  cursor: 'pointer',
};

const bottomTextWrapStyle = {
  marginTop: '28px',
  textAlign: 'center',
};

const bottomTextStyle = {
  margin: '0 0 8px 0',
  color: '#667085',
  fontSize: '14px',
};

const signupTextStyle = {
  margin: 0,
  color: '#17233A',
  fontSize: '14px',
  fontWeight: 800,
};

const splashStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(180deg, #FFFDF2 0%, #FFFFFF 100%)',
  zIndex: 999,
  transition: 'opacity 0.8s ease-out',
};

const splashLogoWrapperStyle = {
  width: '120px',
  height: '120px',
  borderRadius: '32px',
  backgroundColor: '#FFF9C4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 18px 40px rgba(0, 0, 0, 0.08)',
  marginBottom: '20px',
};

const splashLogoStyle = {
  width: '84px',
  height: '84px',
  objectFit: 'contain',
};

const splashTitleStyle = {
  margin: '0 0 10px 0',
  fontSize: '32px',
  fontWeight: '900',
  letterSpacing: '-0.03em',
  color: '#17233A',
};

const splashSubtitleStyle = {
  margin: 0,
  fontSize: '16px',
  color: '#667085',
  textAlign: 'center',
};