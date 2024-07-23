# Trip-It v2

<details>
<summary>2024년 7월 20일</summary>

### create-react-app 설치

#### 현재 폴더에 create-react-app 설치

#### create-react-app에 typescript 적용하기

#### 필요없는 페이지들 정리하기

#### 파비콘 및 타이틀 적용하기

### 리액트 라우터 돔 적용하기

#### 리액트 라우터 돔 설치

#### 리액트 라우터 돔을 이용해서 라우터 만들기

- RootLayout과 PlanLayout
- RootLayout : 최대 너비 1200px 헤더가 있음
- PlanLayout : 전체 너비 헤더 없음

### RootLayout 레이아웃 만들기

- 상단에 헤더 추가
- 하단에 자식 요소들이 들어감

#### 준현님이 만든 Header 적용

##### troubleshooting react-cookie module or type error

![image](https://github.com/user-attachments/assets/f4e0801e-cc13-491f-8691-27425f1cbbea)
해결

```json
    "compilerOptions": {
    "target": "ES6", // 추가 es5 => es6
    "types": ["node"], // react-cookie 타입 에러 해결
    "lib": ["dom", "dom.iterable", "esnext"],
    }
```

추가 문제
추가한 코드를 주석처리해도 문제가 다시 나타나지 않음

#### 준현님이 만든 로그인, 회원가입 및 채팅 추가

</details>
<details>
<summary>2024년 7월 21일</summary>

### 백엔드와 연결해서 로그인 회원가입 access 토큰, refresh 토큰 구현

</details>
<details>
<summary>2024년 7월 22일</summary>

### 마이페이지 기본 레이아웃 구현

#### 마이페이지를 라우터에 추가

#### 마이페이지 헤더 적용

#### 마이페이지의 active 페이지 표시하기

### 마이페이지 프로필 페이지 구현

#### 백엔드에서 로그인한 유저의 정보 가져오기

#### 프로필 스타일링

#### 프로필 비밀번호 변경

#### firebase에 사진 업로드 및 링크 가져오기

#### 프로필 변경하기

</details>

<details>
<summary>2024년 7월 23일</summary>

### 프로필 페이지 리팩토링
#### textarea 값 넣기 
#### onChange 리렌더링 횟수 줄이기 
#### textarea 최대 글자 수 제한 

</details>
