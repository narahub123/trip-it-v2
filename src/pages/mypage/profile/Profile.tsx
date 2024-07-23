import { useCallback, useEffect, useRef, useState } from "react";
import { useRenderCount } from "@uidotdev/usehooks";
import "./profile.css";
import {
  checkPassordAPI, // 비밀번호 확인 API
  fetchProfileAPI, // 프로필 정보 가져오기 API
  updatePasswordAPI,
  updateProfileAPI, // 비밀번호 업데이트 API
} from "apis/mypage/profile";
import { ProfileType, UserType } from "types/users";
import { convertDataToDate, handleImageUpload } from "utilities/profile";
import { debounce } from "utilities/debounce";
import { fetchProfileMsg, ProfileMsgType } from "data/profile";

const Profile = () => {
  const renderCount = useRenderCount();
  const [loading, setLoading] = useState(false);
  // 사용자 정보를 저장할 상태
  const [user, setUser] = useState<UserType>();
  // 비밀번호 입력 상태 (초기값으로 별표 문자열 설정)
  const [password, setPassword] = useState(
    "***********************************"
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
  const [profile, setProfile] = useState<ProfileType>({
    userpic: user ? user.userpic : "",
    nickname: user ? user.nickname : "",
    userIntro: user ? user.userIntro : "",
  });
  // 프로필 수정 버튼 상태
  const [isShowing, setIsShowing] = useState(false);

  // 포커스를 위한 참조
  const pwRef = useRef<HTMLInputElement>(null);

  // 에러 정보 상태
  const [message, setMessage] = useState<ProfileMsgType>();

  // 컴포넌트가 처음 렌더링될 때 사용자 프로필 정보를 가져옴
  useEffect(() => {
    setLoading(true);
    fetchProfileAPI()
      .then((res) => {
        console.log(res?.data); // 서버로부터 받은 사용자 데이터 로그
        setUser(res?.data); // 사용자 상태 업데이트
        setProfile({
          userpic: res?.data.userpic,
          nickname: res?.data.nickname,
          userIntro: res?.data.userIntro,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      }); // 오류 발생 시 로그
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

  // profile 내용이 기존과 다른 경우 수정 버튼이 보이게 하기
  useEffect(() => {
    if (
      (profile.userpic.length !== 0 ||
        profile.userIntro.length !== 0 ||
        user?.nickname !== profile.nickname) &&
      (user?.userpic !== profile.userpic ||
        user?.nickname !== profile.nickname ||
        user?.userIntro !== profile.userIntro)
    ) {
      setIsShowing(true);
    } else {
      setIsShowing(false);
    }
  }, [profile]);

  // 모달창을 열기 위한 핸들러
  const handleModal = () => {
    // 비밀번호 수정 확인 메시지
    if (!window.confirm(`비밀번호를 수정하시겠습니까?`)) {
      return;
    }
    setOpenModal(true); // 모달창 열기
  };

  // 입력한 비밀번호를 서버에서 확인하는 함수
  const checkPassword = useCallback(
    (e: any) => {
      console.log(password);
      checkPassordAPI(password)
        .then((res) => {
          console.log(res); // 서버로부터 받은 응답 데이터 로그
          if (res?.status === 200) {
            setPassword(""); // 비밀번호 입력 필드 초기화
            setOpenModal(false); // 모달 닫기
            setDisabled(false); // 비밀번호 입력 필드 활성화
            setMessage(fetchProfileMsg(2));
            if (pwRef.current) {
              console.log(pwRef.current);

              pwRef.current.value = "";
              pwRef.current.focus();
            }
          }
        })
        .catch((err) => {
          // 에러 메시지를 message 상태에 저장
          if (!err.msgId) return;
          const msg = fetchProfileMsg(err.msgId);
          setMessage(msg);
        }); // 오류 발생 시 로그

      e.preventDefault();
    },
    [password]
  );

  // 비밀번호 입력 필드의 값이 변경될 때 호출되는 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target ? e.target.value : e.currentTarget.value;

    setPassword(value); // 비밀번호 상태 업데이트
  };

  const debouncedhandleChange = debounce<typeof handleChange>(
    handleChange,
    500
  );

  // 비밀번호를 변경하는 함수
  const changePassword = () => {
    const validation = ValidatePw(password); // 비밀번호 유효성 검사
    if (!validation) {
      setMessage(fetchProfileMsg(7));
      return;
    }

    if (!window.confirm(`입력한 비밀번호로 변경하시겠습니까?`)) {
      return;
    }

    // 비밀번호 업데이트 API 호출
    updatePasswordAPI(password)
      .then((res) => {
        if (!res) {
          return;
        }

        console.log(res);

        if (res.status === 200) {
          setDisabled(true); // 비밀번호 입력 필드 비활성화
          setPassword(`***********************************`); // 비밀번호 입력 필드 초기화
          setMessage(fetchProfileMsg(4)); // 업데이트 성공 알림
          if (pwRef.current) {
            console.log(pwRef.current);

            pwRef.current.value = "***********************************";
          }
        }
      })
      .catch((err) => {
        setMessage(fetchProfileMsg(err.msgId));
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

  // 프로필 입력 필드의 값이 변경될 때 호출되는 핸들러
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value.trim();

    setProfile({
      ...profile,
      [id]: value,
    });
  };

  const debouncedProfileChange = debounce<typeof handleProfileChange>(
    handleProfileChange,
    500
  );

  // 프로필 수정하기
  const handleProfile = () => {
    if (!window.confirm("프로필을 수정하시겠습니까?")) {
      return false;
    }

    updateProfileAPI(profile)
      .then((res) => {
        if (!res) return;

        if (res.status === 200) {
          setMessage(fetchProfileMsg(8));
          setIsShowing(false);
          setUser((prevUser) => ({
            userpic: profile.userpic,
            nickname: profile.nickname,
            userIntro: profile.userIntro,
            birth: prevUser?.birth ?? "",
            email: prevUser?.email ?? "",
            gender: prevUser?.gender ?? "m",
            password: prevUser?.password ?? "",
            regdate: prevUser?.regdate ?? "",
            _id: prevUser?._id ?? "",
            reportCount: prevUser?.reportCount ?? 0,
            role: prevUser?.role ?? "user",
            userId: prevUser?.userId ?? "",
            username: prevUser?.username ?? "",
          }));
          setImagePercent(0);
        }
      })
      .catch((err) => {
        setMessage(fetchProfileMsg(err.msgId));
      });
  };

  console.log("user", user); // 사용자 정보 로그
  console.log("password", password);

  console.log("imagePercent", imagePercent); // 이미지 업로드 진행 상태 로그
  console.log("profile", profile); // 프로필 정보 로그
  console.log("런더링", renderCount);

  // 모달창이 열리면 스크롤이 안되게 조정
  if (openModal || message) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <div className="mypage-profile">
      {openModal && (
        <div className="mypage-profile-modal">
          <div className="mypage-profile-modal-container">
            <form onSubmit={checkPassword}>
              <div className="mypage-profile-modal-main">
                <p>현재 비밀번호를 입력해주세요.</p>
                <input
                  type="password"
                  onChange={debouncedhandleChange}
                  autoFocus
                />
                <div className="mypage-profile-modal-btns">
                  <button type="button" onClick={() => setOpenModal(false)}>
                    취소
                  </button>
                  <button type="button" onClick={checkPassword}>
                    확인
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {message && (
        <div className="mypage-profile-message-modal">
          <div className="mypage-profile-message-modal-container">
            <div className="mypage-profile-message-modal-main">
              <p className="mypage-profile-message-modal-header">
                {message.msgs.header}
              </p>
              <p className="mypage-profile-message-modal-message">
                {message.msgs.main}
              </p>
              <div className="mypage-profile-message-modal-btns">
                <button
                  type="button"
                  className="mypage-profile-message-modal-cancel"
                  onClick={() => {
                    setMessage(undefined);
                  }}
                  disabled={
                    message.type === 1 || message.type === 2 ? true : false
                  }
                  autoFocus
                >
                  {message.type === 1 || message.type === 2 ? "" : "취소"}
                </button>
                <button
                  type="button"
                  className="mypage-profile-message-modal-confirm"
                  onClick={() => {
                    setMessage(undefined);
                  }}
                  autoFocus
                >
                  확인
                </button>
              </div>
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
            <tr className="mypage-profile-body-row">
              <td className="mypage-profile-body-td" rowSpan={3}>
                렌더링 횟수 : {renderCount}
              </td>
            </tr>
          </thead>
          {loading && (
            <tbody className="mypage-profile-body">
              <tr className="mypage-profile-body-row">
                <td className="mypage-profile-body-td" colSpan={3}>
                  loading...
                </td>
              </tr>
            </tbody>
          )}
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
                <input
                  type="text"
                  id="nickname"
                  defaultValue={profile.nickname}
                  onChange={debouncedProfileChange}
                />
              </td>
              <td className="mypage-profile-body-td" rowSpan={2}>
                {isShowing && (
                  <button type="button" onClick={handleProfile}>
                    프로필 수정
                  </button>
                )}
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <td className="mypage-profile-body-td">
                {/* <textarea
                  name=""
                  id="userIntro"
                  maxLength={100}
                  defaultValue={profile.userIntro}
                  onChange={debouncedProfileChange}
                ></textarea> */}
                <input
                  type="text"
                  id="userIntro"
                  defaultValue={profile.userIntro}
                  onChange={debouncedProfileChange}
                />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">이름</th>
              <td className="mypage-profile-body-td">
                <input
                  type="text"
                  value={user?.username || ""}
                  readOnly
                  disabled
                />
              </td>
              <td className="mypage-profile-body-td"></td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">비밀번호</th>
              <td className="mypage-profile-body-td">
                <input
                  type="password"
                  defaultValue={password}
                  disabled={disabled}
                  onChange={debouncedhandleChange}
                  ref={pwRef}
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
              <td className="mypage-profile-body-td">
                <input
                  type="text"
                  value={user?.email || ""}
                  readOnly
                  disabled
                />
              </td>
              <td className="mypage-profile-body-td"></td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">성별</th>
              <td className="mypage-profile-body-td">
                <input
                  type="text"
                  value={user?.gender === "m" ? "남성" : "여성"}
                  readOnly
                  disabled
                />
              </td>
              <td className="mypage-profile-body-td"></td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">생년월일</th>
              <td className="mypage-profile-body-td">
                <input
                  type="text"
                  value={user ? convertDataToDate(user?.birth) : ""}
                  readOnly
                  disabled
                />
              </td>
              <td className="mypage-profile-body-td"></td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">가입일</th>
              <td className="mypage-profile-body-td">
                <input
                  type="text"
                  value={user?.regdate || ""}
                  readOnly
                  disabled
                />
              </td>
              <td className="mypage-profile-body-td"></td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">신고당한 횟수</th>
              <td className="mypage-profile-body-td">
                <input
                  type="text"
                  value={user?.reportCount || 0}
                  readOnly
                  disabled
                />
              </td>
              <td className="mypage-profile-body-td"></td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">등급</th>
              <td className="mypage-profile-body-td">
                <input
                  type="text"
                  value={user?.role === "ROLE_USER" ? "사용자" : "관리자"}
                  readOnly
                  disabled
                />
              </td>
              <td className="mypage-profile-body-td"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
