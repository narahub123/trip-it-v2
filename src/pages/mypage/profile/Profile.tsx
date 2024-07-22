import { useEffect, useState } from "react";
import "./profile.css";
import {
  checkPassordAPI, // 비밀번호 확인 API
  fetchProfileAPI, // 프로필 정보 가져오기 API
  updatePasswordAPI, // 비밀번호 업데이트 API
} from "apis/mypage/profile";
import { UserType } from "types/users";
import { convertDataToDate } from "utilities/profile";

const Profile = () => {
  // 사용자 정보를 저장할 상태
  const [user, setUser] = useState<UserType>();
  // 비밀번호 입력 상태
  const [password, setPassword] = useState(
    `***********************************`
  );
  // 모달 열기 상태
  const [openModal, setOpenModal] = useState(false);
  // 비밀번호 입력 필드 비활성화 상태
  const [disabled, setDisabled] = useState(true);

  // 컴포넌트가 처음 렌더링될 때 사용자 프로필 정보를 가져옴
  useEffect(() => {
    fetchProfileAPI()
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // 모달창을 열기 위한 핸들러
  const handleModal = () => {
    // 비밀번호 수정 확인 메시지
    if (!window.confirm(`비밀번호를 수정하시겠습니까?`)) {
      return;
    }
    setOpenModal(true);
  };

  // 입력한 비밀번호를 서버에서 확인하는 함수
  const checkPassword = () => {
    checkPassordAPI(password)
      .then((res) => {
        console.log(res?.data);
        if (res?.data.code === "ok") {
          setPassword(""); // 비밀번호 입력 필드 초기화
          setOpenModal(false); // 모달 닫기
          setDisabled(false); // 비밀번호 입력 필드 활성화
        }
      })
      .catch((err) => console.log(err));
  };

  // 비밀번호 입력 필드의 값이 변경될 때 호출되는 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassword = e.currentTarget.value;
    console.log(currentPassword);

    setPassword(currentPassword);
  };

  // 비밀번호를 변경하는 함수
  const changePassword = () => {
    const validation = ValidatePw(password);
    if (!validation) {
      window.alert("잘못된 형식의 비밀번호입니다. 다시 작성해주세요.");
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
        window.alert("비밀번호가 업데이트 되었습니다.");
      }
    });
  };

  // 비밀번호 유효성 검사 함수
  const ValidatePw = (value: string) => {
    // 비밀번호 정규 표현식 (영문자, 숫자, 특수문자 포함, 길이 8-12자)
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
    const result = pwRegex.test(value);
    console.log(result);
    return result;
  };

  console.log(user);
  console.log(password);

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
                <img
                  src={
                    user?.userpic.length !== 0
                      ? user?.userpic
                      : "/images/defaultImage.jpg"
                  }
                  alt="프로필 사진"
                />
              </td>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input type="text" value={user?.nickname || ""} />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <td className="mypage-profile-body-td" colSpan={2}>
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
