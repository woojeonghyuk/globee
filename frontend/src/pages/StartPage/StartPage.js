import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.css';
import logo from '../../assets/logo.png';

function StartPage() {
  const navigate = useNavigate();

  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeSplash(true);
    }, 8000);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 1400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showSplash && (
        <div
          className={`start-page__splash ${
            fadeSplash ? 'start-page__splash--hide' : ''
          }`}
        >
          <div className="start-page__splash-content">
            <div className="start-page__splash-logo-box">
              <img
                src={logo}
                alt="Globee logo"
                className="start-page__splash-logo"
              />
            </div>
            <h1 className="start-page__splash-title">GLOBEE</h1>
          </div>
        </div>
      )}

      <div className="start-page">
        <div className="start-page__container">
          <section className="start-page__left">
            <div className="start-page__brand-logo-box">
              <img
                src={logo}
                alt="Globee logo"
                className="start-page__brand-logo"
              />
            </div>

            <div className="start-page__brand-badge">GLOBEE</div>

            <h1 className="start-page__title">
              외국인 학생과
              <br />
              지역 학생을 연결하는
              <br />
              문화 플랫폼
            </h1>

            <p className="start-page__description">
              대학의 빈 강의실과 외국인 학생의 문화 콘텐츠를 연결해,
              <br />
              누구나 캠퍼스에서 새로운 문화를 배우고 경험할 수 있도록 돕습니다.
            </p>

            <div className="start-page__tags">
              <div className="start-page__tag">🌍 캠퍼스 기반 문화교류</div>
              <div className="start-page__tag">🏫 유휴공간 활용 클래스</div>
              <div className="start-page__tag">🤝 외국인 학생 · 지역 학생 연결</div>
            </div>
          </section>

          <section className="start-page__right">
            <div className="start-page__role-card">
              <h2 className="start-page__role-title">누구로 시작할까요?</h2>
              <p className="start-page__role-subtitle">
                원하는 역할을 선택하고 GLOBEE를 시작해보세요
              </p>

              <div className="start-page__role-button-group">
                <button
                  className="start-page__role-button start-page__role-button--student"
                  onClick={() => navigate('/student-login')}
                >
                  <div className="start-page__role-icon">🎒</div>
                  <div className="start-page__role-text-box">
                    <h3 className="start-page__role-button-title">학생</h3>
                    <p className="start-page__role-button-desc">
                      다양한 문화 수업을 둘러보고 신청해보세요
                    </p>
                  </div>
                </button>

                <button
                  className="start-page__role-button start-page__role-button--teacher"
                  onClick={() => navigate('/teacher-login')}
                >
                  <div className="start-page__role-icon">🌏</div>
                  <div className="start-page__role-text-box">
                    <h3 className="start-page__role-button-title">유학생</h3>
                    <p className="start-page__role-button-desc">
                      나만의 문화 수업을 열고 학생들과 연결해보세요
                    </p>
                  </div>
                </button>
              </div>

              <div className="start-page__role-footer">
                <p>간단한 로그인 후 바로 시작할 수 있어요.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default StartPage;