import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div style={pageStyle}>
      <div style={backgroundGlowTop} />
      <div style={backgroundGlowBottom} />

      <div style={contentWrapStyle}>
        {/* 상단 헤더 */}
        <header style={headerStyle}>
          <div style={brandStyle}>
            <div style={brandLogoWrapperStyle}>
              <img src={logo} alt="Globee 로고" style={brandLogoStyle} />
            </div>
            <div>
              <div style={brandNameStyle}>GLOBEE</div>
              <div style={brandSubStyle}>캠퍼스 문화교류 플랫폼</div>
            </div>
          </div>

          <button style={logoutButtonStyle} onClick={() => navigate('/')}>
            로그아웃
          </button>
        </header>

        {/* 메인 히어로 */}
        <section style={heroSectionStyle}>
          <div style={heroLeftStyle}>
            <div style={badgeStyle}>WELCOME TO GLOBEE</div>

            <h1 style={heroTitleStyle}>
              캠퍼스에서 시작하는
              <br />
              따뜻한 문화교류
            </h1>

            <p style={heroDescriptionStyle}>
              외국인 학생과 지역 학생을 연결하고,
              <br />
              대학의 빈 강의실을 문화 클래스 공간으로 바꿔보세요.
            </p>

            <div style={heroButtonRowStyle}>
              <button
                style={primaryButtonStyle}
                onClick={() => alert('클래스 개설 페이지는 다음 단계에서 연결할 예정이에요!')}
              >
                클래스 열기
              </button>

              <button
                style={secondaryButtonStyle}
                onClick={() => alert('클래스 둘러보기 페이지는 다음 단계에서 연결할 예정이에요!')}
              >
                클래스 둘러보기
              </button>
            </div>
          </div>

          <div style={heroRightStyle}>
            <div style={summaryCardStyle}>
              <div style={summaryTitleStyle}>오늘의 GLOBEE</div>

              <div style={summaryItemStyle}>
                <span style={summaryLabelStyle}>운영 클래스</span>
                <span style={summaryValueStyle}>12개</span>
              </div>

              <div style={summaryItemStyle}>
                <span style={summaryLabelStyle}>참여 학생</span>
                <span style={summaryValueStyle}>86명</span>
              </div>

              <div style={summaryItemStyle}>
                <span style={summaryLabelStyle}>활용 강의실</span>
                <span style={summaryValueStyle}>7개</span>
              </div>

              <div style={summaryDividerStyle} />

              <div style={summaryMiniTextStyle}>
                지금은 데모 화면입니다.
                <br />
                다음 단계에서 실제 데이터와 연결할 수 있어요.
              </div>
            </div>
          </div>
        </section>

        {/* 기능 카드 */}
        <section style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>빠른 시작</h2>
            <p style={sectionDescStyle}>필요한 기능부터 차근차근 만들어가면 돼요.</p>
          </div>

          <div style={cardGridStyle}>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>🌍</div>
              <h3 style={featureTitleStyle}>외국인 학생으로 참여</h3>
              <p style={featureTextStyle}>
                나만의 문화 클래스를 열고
                <br />
                캠퍼스 안에서 새로운 교류를 시작해보세요.
              </p>
              <button
                style={cardButtonStyle}
                onClick={() => alert('외국인 학생용 클래스 개설 페이지로 연결 예정')}
              >
                클래스 열기
              </button>
            </div>

            <div style={featureCardStyle}>
              <div style={featureIconStyle}>🎓</div>
              <h3 style={featureTitleStyle}>학생으로 클래스 찾기</h3>
              <p style={featureTextStyle}>
                관심 있는 국가와 문화를 선택하고
                <br />
                원하는 클래스를 신청해보세요.
              </p>
              <button
                style={cardButtonStyle}
                onClick={() => alert('학생용 클래스 목록 페이지로 연결 예정')}
              >
                클래스 보기
              </button>
            </div>

            <div style={featureCardStyle}>
              <div style={featureIconStyle}>🏫</div>
              <h3 style={featureTitleStyle}>유휴공간 활용</h3>
              <p style={featureTextStyle}>
                비어 있는 강의실을 활용해
                <br />
                실제 문화교류가 일어나는 공간으로 바꿉니다.
              </p>
              <button
                style={cardButtonStyle}
                onClick={() => alert('강의실/운영 관리 기능은 추후 추가 예정')}
              >
                운영 안내
              </button>
            </div>
          </div>
        </section>

        {/* 하단 안내 */}
        <section style={bottomBannerStyle}>
          <div>
            <div style={bottomBannerTitleStyle}>GLOBEE는 이렇게 시작하면 좋아요</div>
            <div style={bottomBannerTextStyle}>
              로그인 → 클래스 개설 또는 탐색 → 신청/운영 흐름으로 확장해보세요.
            </div>
          </div>

          <button style={bottomBannerButtonStyle} onClick={() => navigate('/')}>
            처음으로
          </button>
        </section>
      </div>
    </div>
  );
}

export default MainPage;

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
  margin: '0 auto',
  padding: '36px 56px 56px',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '40px',
};

const brandStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
};

const brandLogoWrapperStyle = {
  width: '62px',
  height: '62px',
  borderRadius: '18px',
  backgroundColor: '#FFF9C4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.06)',
};

const brandLogoStyle = {
  width: '42px',
  height: '42px',
  objectFit: 'contain',
};

const brandNameStyle = {
  fontSize: '20px',
  fontWeight: '900',
  color: '#17233A',
  lineHeight: '1.1',
};

const brandSubStyle = {
  fontSize: '13px',
  color: '#667085',
  marginTop: '4px',
};

const logoutButtonStyle = {
  height: '44px',
  padding: '0 18px',
  borderRadius: '14px',
  border: '1px solid #E5E7EB',
  backgroundColor: '#FFFFFF',
  color: '#344054',
  fontSize: '14px',
  fontWeight: '800',
  cursor: 'pointer',
};

const heroSectionStyle = {
  display: 'grid',
  gridTemplateColumns: '1.15fr 0.85fr',
  gap: '28px',
  alignItems: 'stretch',
  marginBottom: '34px',
};

const heroLeftStyle = {
  backgroundColor: 'rgba(255,255,255,0.72)',
  border: '1px solid rgba(255,255,255,0.7)',
  borderRadius: '32px',
  padding: '42px',
  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.05)',
  backdropFilter: 'blur(10px)',
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
  fontSize: '13px',
  fontWeight: '800',
  marginBottom: '22px',
};

const heroTitleStyle = {
  margin: 0,
  fontSize: '58px',
  lineHeight: '1.08',
  letterSpacing: '-0.04em',
  fontWeight: 900,
  color: '#17233A',
};

const heroDescriptionStyle = {
  marginTop: '22px',
  marginBottom: '28px',
  fontSize: '17px',
  lineHeight: '1.75',
  color: '#667085',
};

const heroButtonRowStyle = {
  display: 'flex',
  gap: '14px',
  flexWrap: 'wrap',
};

const primaryButtonStyle = {
  height: '54px',
  padding: '0 24px',
  border: 'none',
  borderRadius: '18px',
  backgroundColor: '#FFF3A6',
  color: '#14233C',
  fontSize: '16px',
  fontWeight: 900,
  cursor: 'pointer',
  boxShadow: '0 10px 24px rgba(255, 243, 166, 0.45)',
};

const secondaryButtonStyle = {
  height: '54px',
  padding: '0 24px',
  borderRadius: '18px',
  border: '1px solid #E5E7EB',
  backgroundColor: '#FFFFFF',
  color: '#344054',
  fontSize: '16px',
  fontWeight: 800,
  cursor: 'pointer',
};

const heroRightStyle = {
  display: 'flex',
};

const summaryCardStyle = {
  width: '100%',
  backgroundColor: '#FFFFFF',
  borderRadius: '32px',
  padding: '32px',
  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.06)',
  border: '1px solid rgba(0, 0, 0, 0.04)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const summaryTitleStyle = {
  fontSize: '22px',
  fontWeight: '900',
  color: '#17233A',
  marginBottom: '24px',
};

const summaryItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
};

const summaryLabelStyle = {
  fontSize: '15px',
  color: '#667085',
  fontWeight: '700',
};

const summaryValueStyle = {
  fontSize: '24px',
  color: '#17233A',
  fontWeight: '900',
};

const summaryDividerStyle = {
  height: '1px',
  backgroundColor: '#ECECEC',
  margin: '8px 0 18px',
};

const summaryMiniTextStyle = {
  fontSize: '14px',
  lineHeight: '1.7',
  color: '#667085',
};

const sectionStyle = {
  marginBottom: '32px',
};

const sectionHeaderStyle = {
  marginBottom: '18px',
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: '28px',
  fontWeight: '900',
  color: '#17233A',
};

const sectionDescStyle = {
  margin: '8px 0 0 0',
  fontSize: '15px',
  color: '#667085',
};

const cardGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
};

const featureCardStyle = {
  backgroundColor: '#FFFFFF',
  borderRadius: '28px',
  padding: '28px',
  boxShadow: '0 18px 40px rgba(0, 0, 0, 0.05)',
  border: '1px solid rgba(0, 0, 0, 0.04)',
};

const featureIconStyle = {
  width: '56px',
  height: '56px',
  borderRadius: '18px',
  backgroundColor: '#FFF9C4',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '26px',
  marginBottom: '18px',
};

const featureTitleStyle = {
  margin: '0 0 12px 0',
  fontSize: '22px',
  fontWeight: '900',
  color: '#17233A',
  lineHeight: '1.3',
};

const featureTextStyle = {
  margin: '0 0 22px 0',
  fontSize: '15px',
  lineHeight: '1.7',
  color: '#667085',
};

const cardButtonStyle = {
  width: '100%',
  height: '50px',
  border: 'none',
  borderRadius: '16px',
  backgroundColor: '#FFF3A6',
  color: '#14233C',
  fontSize: '15px',
  fontWeight: 900,
  cursor: 'pointer',
};

const bottomBannerStyle = {
  backgroundColor: '#17233A',
  borderRadius: '28px',
  padding: '28px 30px',
  color: '#FFFFFF',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
};

const bottomBannerTitleStyle = {
  fontSize: '22px',
  fontWeight: '900',
  marginBottom: '8px',
};

const bottomBannerTextStyle = {
  fontSize: '15px',
  lineHeight: '1.7',
  color: 'rgba(255,255,255,0.82)',
};

const bottomBannerButtonStyle = {
  minWidth: '120px',
  height: '48px',
  borderRadius: '16px',
  border: 'none',
  backgroundColor: '#FFF3A6',
  color: '#14233C',
  fontSize: '15px',
  fontWeight: 900,
  cursor: 'pointer',
};