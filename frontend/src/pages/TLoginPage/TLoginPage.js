import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TLoginPage.css';

function TLoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // 나중에 로그인 로직 연결
    navigate('/teacher-main');
  };

  return (
    <div className="t-login-page">
      <div className="t-login-page__background-glow t-login-page__background-glow--left"></div>
      <div className="t-login-page__background-glow t-login-page__background-glow--right"></div>

      <div className="t-login-page__card">
        <button
          type="button"
          className="t-login-page__back-button"
          onClick={() => navigate('/')}
        >
          ← 시작페이지로 돌아가기
        </button>

        <div className="t-login-page__header">
          <div className="t-login-page__badge">TEACHER</div>
          <h1 className="t-login-page__title">시작하기</h1>
          <p className="t-login-page__subtitle">
            GLOBEE에 로그인하고 문화 수업을 시작해보세요
          </p>
        </div>

        <form className="t-login-page__form" onSubmit={handleSubmit}>
          <div className="t-login-page__field">
            <label htmlFor="teacher-email" className="t-login-page__label">
              이메일
            </label>
            <input
              id="teacher-email"
              type="email"
              className="t-login-page__input"
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div className="t-login-page__field">
            <label htmlFor="teacher-password" className="t-login-page__label">
              비밀번호
            </label>
            <input
              id="teacher-password"
              type="password"
              className="t-login-page__input"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <label className="t-login-page__checkbox-row">
            <input type="checkbox" className="t-login-page__checkbox" />
            <span className="t-login-page__checkbox-text">자동 로그인</span>
          </label>

          <button type="submit" className="t-login-page__login-button">
            로그인
          </button>
        </form>

        <div className="t-login-page__footer">
          <p className="t-login-page__footer-text">아직 가입하지 않으셨나요?</p>
          <button
            type="button"
            className="t-login-page__signup-button"
            onClick={() =>
              alert('유학생 회원가입 및 인증 페이지는 다음 단계에서 연결하면 됩니다!')
            }
          >
            이메일로 회원가입하기 &amp; 유학생 인증받기
          </button>
        </div>
      </div>
    </div>
  );
}

export default TLoginPage;