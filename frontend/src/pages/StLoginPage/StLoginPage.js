import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StLoginPage.css';

function StLoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // 나중에 로그인 로직 연결
    navigate('/student-main');
  };

  return (
    <div className="st-login-page">
      <div className="st-login-page__background-glow st-login-page__background-glow--left"></div>
      <div className="st-login-page__background-glow st-login-page__background-glow--right"></div>

      <div className="st-login-page__card">
        <button
          type="button"
          className="st-login-page__back-button"
          onClick={() => navigate('/')}
        >
          ← 시작페이지로 돌아가기
        </button>

        <div className="st-login-page__header">
          <div className="st-login-page__badge">STUDENT</div>
          <h1 className="st-login-page__title">시작하기</h1>
          <p className="st-login-page__subtitle">
            GLOBEE에 로그인하고 문화교류를 시작해보세요
          </p>
        </div>

        <form className="st-login-page__form" onSubmit={handleSubmit}>
          <div className="st-login-page__field">
            <label htmlFor="student-email" className="st-login-page__label">
              이메일
            </label>
            <input
              id="student-email"
              type="email"
              className="st-login-page__input"
              placeholder="이메일을 입력하세요"
            />
          </div>

          <div className="st-login-page__field">
            <label htmlFor="student-password" className="st-login-page__label">
              비밀번호
            </label>
            <input
              id="student-password"
              type="password"
              className="st-login-page__input"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <label className="st-login-page__checkbox-row">
            <input type="checkbox" className="st-login-page__checkbox" />
            <span className="st-login-page__checkbox-text">자동 로그인</span>
          </label>

          <button type="submit" className="st-login-page__login-button">
            로그인
          </button>
        </form>

        <div className="st-login-page__footer">
          <p className="st-login-page__footer-text">아직 가입하지 않으셨나요?</p>
          <button
            type="button"
            className="st-login-page__signup-button"
            onClick={() => alert('학생 회원가입 페이지는 다음 단계에서 연결하면 됩니다!')}
          >
            이메일로 회원가입하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default StLoginPage;