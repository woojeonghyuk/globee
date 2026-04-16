# Globee Mobile

Expo 기반 React Native 앱입니다. 현재는 부모님/학생이 문화 수업을 둘러보고 신청하는 모바일 MVP를 우선으로 만듭니다.

## 실행

```bash
npm install
npm run android
```

또는 개발 서버만 띄울 때:

```bash
npm start
```

## 구조

```text
app/
  _layout.tsx
  index.tsx
  login.tsx
  signup.tsx
  (tabs)/
    _layout.tsx
    home.tsx
    applications.tsx
    completed.tsx
    stamps.tsx
    my.tsx
src/
  components/
  data/
  screens/
  theme/
assets/
  images/
```

`app`은 Expo Router 진입점이고, 실제 화면 구현은 `src/screens`에 둡니다.
