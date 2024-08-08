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

<details>

<summary>2024년 7월 24일</summary>

## 차단 페이지 구현하기

~~### 부목표 : 템플렛 만들기~~ 실패

### 차단 라우터 추가하기

</details>

<details>
<summary>2024년 7월 25일</summary>

## 차단 마이 페이지 구현하기

### 차단 정렬

#### 차단 필드의 항목에 따른 정렬하기

- 차단 당한 사람
- 차단 날짜

##### 정렬을 위해 Array.sort() 함수 사용함

### 차단 페이징

#### 페이징을 위해서 Array.slice() 함수, Array, Array.fill() 함수를 사용함

##### Array 함수에 대한 이해도만 높으면 쉽게 구현 가능

### 차단 검색 구현

### v1 단순 검색 : 검색할 필드를 고정하고 검색 구현 Array.filter 사용

### v2 검색할 필드를 선택할 수 있는 검색 구현 : select option을 이용해서 필드를 변경할 수 있게 구현

### 차단 해제 구현

</details>

<details>

<summary>2024년 7월 26일 </summary>

## 마이페이지 템플렛 만들기

### 템블렛에서 목록 불러오기

#### 서로 다른 페이지에서 다른 api를 이용해서 목록을 불러와야 함

#### 템블렛 props로 api을 받아야 함

### 템블렛 메인 구현하기

#### 현재 템플렛 메인은 테이블

#### 테이블 헤더 구현하기

- 테이블 헤더에 정렬 가능 컬럼과 정렬 불가 컬럼으로 구분
- 정렬 가능 여부를 결정할 필드 추가

#### 테이블 바디 구현하기

- switch문을 이용해서 해당 컬럼의 타입에 따라 다른 형태의 값을 반환함
- 외부로 빼서 값을 전달하려고 했지만 switch문에서 jsx문을 인식 못하는 에러를 해결하지 못해서 실패

### 페이지네이션 구현하기

### 검색 구현하기

</details>

<details>
<summary>2024년 7월 27일</summary>

## 마이페이지 신고 적용하기

## 관리자 페이지 신고 적용하기

- 신고 처리하기
</details>

<details>
<summary>2024년 7월 28일</summary>

## 관리자 페이지 템플렛 만들기

### 신고 페이지 적용하기

### 차단 페이지 적용하기

### 유저 페이지 적용하기

</details>

<details>
<summary>2024년 7월 29일</summary>

## 모집글 구현

## 일정 구현

</details>

<details>
<summary>2024년 7월 30일</summary>

## 프로필 업데이트 with patch

</details>

<details>
<summary>2024년 7월 31일</summary>

## 마이페이지 리팩토링

### useCallback, React.memo, custom hook, forwardRef를 이용한 렌더링 횟수 줄이기

</details>

<details>
<summary>2024년 8월 5일</summary>

## 일정 장소 구현

###

</details>

<details>
<summary>2024년 8월 6일</summary>

## 일정 등록 구현

## 일정 등록 리펙토링

- 각 페이지마다 일정 데이터를 새롭게 받는 방법에서 장소를 선택하면 등록할 때까지 선택한 장소에 데이터를 가지고 다니는 방식으로 변경함
- 장점 : 데이터 이용량을 줄일 수 있음
- 단점 : 코드량이 증가함

</details>

<details>

<summary>2024년 8월 7일</summary>

## 일정 페이지 구현

- api 데이터 횟수 소진으로 진행 못함

## PlanHome 모달창 생성하기

</details>

<details>

<summary>2024년 8월 8일</summary>

## 캘린더 스타일링 수정

## 캘린더 하단 버튼 수정

## 장소 선택 페이지 에러 핸들링

- 공공 데이터와 연결되지 못했을 경우
- dates나 metroId가 없는 경우

</details>
