import { useEffect, useRef, useState } from "react";
import "./profile.css";
import {
  checkPassordAPI, // 비밀번호 확인 API
  fetchProfileAPI, // 프로필 정보 가져오기 API
  updatePasswordAPI, // 비밀번호 업데이트 API
} from "apis/mypage/profile";
import { UserType } from "types/users";
import { convertDataToDate, handleImageUpload } from "utilities/profile";

const Profile = () => {
  // 사용자 정보를 저장할 상태
  const [user, setUser] = useState<UserType>();
  // 비밀번호 입력 상태 (초기값으로 별표 문자열 설정)
  const [password, setPassword] = useState(
    `***********************************`
  );
  // 모달 열기 상태
  const [openModal, setOpenModal] = useState(false);
  // 비밀번호 입력 필드 비활성화 상태
  const [disabled, setDisabled] = useState(true);
  // 이미지 파일 입력을 위한 참조
  const imageRef = useRef<HTMLInputElement>(null);
  // 이미지 파일 상태
  const [image, setImage] = useState<File | undefined>(undefined);
  // 이미지 업로드 진행 상태 백분율
  const [imagePercent, setImagePercent] = useState(0);
  // 이미지 업로드 에러 상태
  const [imageError, setImageError] = useState(false);
  // 프로필 정보 상태
  const [profile, setProfile] = useState<{
    userpic: string;
    nickname: string;
    intro: string;
  }>({
    userpic: user ? user.userpic : "",
    nickname: user ? user.nickname : "",
    intro: user ? user.intro : "",
  });
  // 프로필 수정 버튼 상태
  const [isShowing, setIsShowing] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 사용자 프로필 정보를 가져옴
  useEffect(() => {
    fetchProfileAPI()
      .then((res) => {
        console.log(res.data); // 서버로부터 받은 사용자 데이터 로그
        setUser(res.data); // 사용자 상태 업데이트
      })
      .catch((err) => console.log(err)); // 오류 발생 시 로그
  }, []);

  // 이미지에 변화가 있으면 업데이트
  useEffect(() => {
    if (image) {
      handleImageUpload(
        image,
        setImagePercent,
        setImageError,
        profile,
        setProfile
      );
    }
  }, [image]);

  // 모달창을 열기 위한 핸들러
  const handleModal = () => {
    // 비밀번호 수정 확인 메시지
    if (!window.confirm(`비밀번호를 수정하시겠습니까?`)) {
      return;
    }
    setOpenModal(true); // 모달창 열기
  };

  // 입력한 비밀번호를 서버에서 확인하는 함수
  const checkPassword = () => {
    checkPassordAPI(password)
      .then((res) => {
        console.log(res?.data); // 서버로부터 받은 응답 데이터 로그
        if (res?.data.code === "ok") {
          setPassword(""); // 비밀번호 입력 필드 초기화
          setOpenModal(false); // 모달 닫기
          setDisabled(false); // 비밀번호 입력 필드 활성화
        }
      })
      .catch((err) => console.log(err)); // 오류 발생 시 로그
  };

  // 비밀번호 입력 필드의 값이 변경될 때 호출되는 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassword = e.currentTarget.value;
    console.log(currentPassword); // 입력된 비밀번호 로그

    setPassword(currentPassword); // 비밀번호 상태 업데이트
  };

  // 비밀번호를 변경하는 함수
  const changePassword = () => {
    const validation = ValidatePw(password); // 비밀번호 유효성 검사
    if (!validation) {
      window.alert("잘못된 형식의 비밀번호입니다. 다시 작성해주세요."); // 유효성 검사 실패 시 알림
      return;
    }

    if (!window.confirm(`입력한 비밀번호로 변경하시겠습니까?`)) {
      return;
    }

    // 비밀번호 업데이트 API 호출
    updatePasswordAPI(password).then((res) => {
      if (!res) {
        return;
      }

      if (res.data.code === "ok") {
        setDisabled(true); // 비밀번호 입력 필드 비활성화
        setPassword(`***********************************`); // 비밀번호 입력 필드 초기화
        window.alert("비밀번호가 업데이트 되었습니다."); // 업데이트 성공 알림
      }
    });
  };

  // 비밀번호 유효성 검사 함수
  const ValidatePw = (value: string) => {
    // 비밀번호 정규 표현식 (영문자, 숫자, 특수문자 포함, 길이 8-12자)
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
    const result = pwRegex.test(value);
    console.log(result); // 유효성 검사 결과 로그
    return result; // 유효성 검사 결과 반환
  };

  console.log(user); // 사용자 정보 로그
  console.log(password); // 비밀번호 상태 로그
  console.log(imagePercent); // 이미지 업로드 진행 상태 로그
  console.log(profile); // 프로필 정보 로그

  return (
    <div className="mypage-profile">
      {openModal && (
        <div className="mypage-profile-modal">
          <div className="mypage-profile-modal-container">
            <div className="mypage-profile-modal-main">
              <p>현재 비밀번호를 입력해주세요.</p>
              <input type="password" onChange={(e) => handleChange(e)} />
              <button type="button" onClick={checkPassword}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mypage-profile-container">
        <table className="mypage-profile-table">
          <thead>
            <tr>
              <td colSpan={3}>
                <h3>개인정보</h3>
              </td>
            </tr>
          </thead>
          <tbody className="mypage-profile-body">
            <tr className="mypage-profile-body-row">
              <td className="mypage-profile-body-td" rowSpan={2}>
                <input
                  type="file"
                  ref={imageRef}
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setImage(
                      e.currentTarget?.files
                        ? e.currentTarget.files[0]
                        : undefined
                    )
                  }
                />
                <img
                  src={
                    profile?.userpic.length !== 0
                      ? profile?.userpic
                      : "/images/defaultImage.jpg"
                  }
                  alt="프로필 사진"
                  onClick={() => imageRef.current?.click()}
                />
                <p className="mypage-profile-body-td-image">
                  {imageError ? (
                    <span className="mypage-profile-body-td-image-explanation">
                      Error uploading (file size must be less than 2 MB)
                    </span>
                  ) : imagePercent > 0 && imagePercent < 100 ? (
                    <span className="mypage-profile-body-td-image-explanation">{`Uploading: ${imagePercent} %`}</span>
                  ) : imagePercent === 100 ? (
                    <span className="mypage-profile-body-td-image-explanation">
                      업로드 완료
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </td>
              <td className="mypage-profile-body-td">
                <input type="text" value={user?.nickname || ""} />
              </td>
              <td className="mypage-profile-body-td" rowSpan={2}>
                {isShowing && <button>수정</button>}
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <td className="mypage-profile-body-td">
                <textarea
                  name=""
                  id=""
                  value={user?.intro || ""}
                  placeholder="소개글을 작성해주세요"
                />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">이름</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input
                  type="text"
                  value={user?.username || ""}
                  readOnly
                  disabled
                />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">비밀번호</th>
              <td className="mypage-profile-body-td">
                <input
                  type="password"
                  value={password}
                  disabled={disabled}
                  onChange={(e) => handleChange(e)}
                />
              </td>
              <td>
                {disabled ? (
                  <button onClick={handleModal}>수정</button>
                ) : (
                  <button onClick={changePassword}>변경</button>
                )}
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">이메일</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input
                  type="text"
                  value={user?.email || ""}
                  readOnly
                  disabled
                />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">성별</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input
                  type="text"
                  value={user?.gender === "m" ? "남성" : "여성"}
                  readOnly
                  disabled
                />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">생년월일</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input
                  type="text"
                  value={user ? convertDataToDate(user?.birth) : ""}
                  readOnly
                  disabled
                />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">가입일</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input
                  type="text"
                  value={user?.regdate || ""}
                  readOnly
                  disabled
                />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">신고당한 횟수</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input
                  type="text"
                  value={user?.reportCount || 0}
                  readOnly
                  disabled
                />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">등급</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input
                  type="text"
                  value={user?.role === "ROLE_USER" ? "사용자" : "관리자"}
                  readOnly
                  disabled
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
