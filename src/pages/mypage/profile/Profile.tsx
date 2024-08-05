import "./profile.css";

import { useEffect, useRef, useState } from "react";
import { useRenderCount } from "@uidotdev/usehooks";
import {
  fetchProfileAPI, // 프로필 정보 가져오기 API
} from "apis/profile";
import { ProfileType, UserType } from "types/users";
import { convertDataToDate, handleImageUpload } from "utilities/profile";

import { changePassword, handleModal } from "../utilities/profile";
import { MessageType } from "types/template";
import { useCheckPassword } from "../hooks/useCheckPassword";
import { useDebouncedProfileChange } from "../hooks/useDebounceProfileChange";
import { useDebouncedHandleChangePassword } from "../hooks/useDebouncedHandleChangePassword";
import { useHandleProfile } from "../hooks/useHandleProfile";
import ProfileImage from "./ProfileImage";
import MessageModal from "templates/components/MessageModal";
import ProfileMobile from "../../Mobile/ProfileMobile";

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
    userpic: "",
    nickname: "",
    intro: "",
  });
  // 프로필 수정 버튼 상태
  const [isShowing, setIsShowing] = useState(false);

  // 포커스를 위한 참조
  const pwRef = useRef<HTMLInputElement>(null);

  // 에러 정보 상태
  const [message, setMessage] = useState<MessageType | undefined>();

  // 비밀번호를 확인하는 hook
  const checkPassword = useCheckPassword(
    password,
    setPassword,
    setOpenModal,
    setDisabled,
    setMessage,
    pwRef
  );

  // 비밀번호를 변경하는 hook
  const debouncedHandleChangePassword = useDebouncedHandleChangePassword(
    password,
    setPassword
  );

  // frontend에서 프로필을 변경하는 hook
  const debouncedProfileChange = useDebouncedProfileChange(profile, setProfile);

  // backend와 연결해서 프로필을 변경하는 hook
  const handleProfile = useHandleProfile(
    user,
    profile,
    setMessage,
    setIsShowing,
    setUser,
    setImagePercent
  );

  // 컴포넌트가 처음 렌더링될 때 사용자 프로필 정보를 가져옴
  useEffect(() => {
    setLoading(true);
    fetchProfileAPI()
      .then((res) => {
        setUser(res?.data); // 사용자 상태 업데이트
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
    console.log("profile 렌더링");

    if (
      (profile.userpic.length !== 0 ||
        profile.intro.length !== 0 ||
        profile.nickname.length !== 0) &&
      (user?.userpic !== profile.userpic ||
        user?.intro !== profile.intro ||
        user?.nickname !== profile.nickname)
    ) {
      setIsShowing(true);
    } else {
      setIsShowing(false);
    }
  }, [profile]);

  // console.log("user", user); // 사용자 정보 로그
  // console.log("password", password);

  // console.log("imagePercent", imagePercent); // 이미지 업로드 진행 상태 로그
  console.log("프로필", profile); // 프로필 정보 로그

  console.log("렌더링", renderCount);

  // 모달창이 열리면 스크롤이 안되게 조정
  if (openModal || message) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <>
      <div className="mypage-profile">
        {openModal && (
          <div className="mypage-profile-modal">
            <div className="mypage-profile-modal-container">
              <form onSubmit={checkPassword}>
                <div className="mypage-profile-modal-main">
                  <p>현재 비밀번호를 입력해주세요.</p>
                  <input
                    type="password"
                    onChange={debouncedHandleChangePassword}
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
        {message && <MessageModal message={message} setMessage={setMessage} />}
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
            {loading ? (
              <tbody className="mypage-profile-body">
                <tr className="mypage-profile-body-row">
                  <td className="mypage-profile-body-td" colSpan={3}>
                    loading...
                  </td>
                </tr>
              </tbody>
            ) : (
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
                    <ProfileImage
                      userpic={user?.userpic}
                      profilePic={profile.userpic}
                      ref={imageRef}
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
                      defaultValue={user?.nickname}
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
                    <input
                      type="text"
                      id="intro"
                      defaultValue={user?.intro}
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
                      onChange={debouncedHandleChangePassword}
                      ref={pwRef}
                    />
                  </td>
                  <td>
                    {disabled ? (
                      <button onClick={() => handleModal(setOpenModal)}>
                        수정
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          changePassword(
                            password,
                            setMessage,
                            setDisabled,
                            setPassword,
                            pwRef
                          )
                        }
                      >
                        변경
                      </button>
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
            )}
          </table>
        </div>
      </div>
      <ProfileMobile />
    </>
  );
};

export default Profile;
