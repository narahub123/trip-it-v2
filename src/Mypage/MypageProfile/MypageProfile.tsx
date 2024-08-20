import "./mypageProfile.css";
import { useEffect, useRef, useState } from "react";
import { ProfileType, UserType } from "types/users";
import useHandleClickImage from "./hook/useHandleClickImage";
import { LuClipboardEdit, LuPencil } from "react-icons/lu";
import { profileForm } from "./data/profile";
import { convertDataToDate } from "utilities/profile";
import {
  fetchProfileAPI,
  updatePasswordAPI,
  updateProfileAPI,
} from "apis/profile";

const MypageProfile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserType>();
  const imageRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const introRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nickIconRef = useRef<HTMLSpanElement>(null);
  const introIconRef = useRef<HTMLSpanElement>(null);
  const passwordIconRef = useRef<HTMLSpanElement>(null);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState<ProfileType>({
    intro: "",
    userpic: "",
    nickname: "",
  });
  const handleClickImage = useHandleClickImage(imageRef);

  useEffect(() => {
    setLoading(true);
    try {
      fetchProfileAPI()
        .then((res) => {
          if (!res) return;
          setUser(res?.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 데이터 수정 여부 확인하기
  const handleCheckProfile = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const field = e.currentTarget.dataset.edit
      ? e.currentTarget.dataset.edit
      : "";
  };

  // 포커스 주기
  const setFocus = (field: string) => {
    const input =
      field === "nickname"
        ? nicknameRef
        : field === "intro"
        ? introRef
        : field === "password"
        ? passwordRef
        : undefined;

    if (!input) return;
    if (!input.current) return;
    input.current.disabled = false;

    const value = input.current.value;
    input.current?.focus();
    input.current.value = "";
    input.current.value = value;

    if (field === "nickname") {
      nickIconRef.current?.style.setProperty("visibility", "hidden");
    } else if (field === "intro") {
      introIconRef.current?.style.setProperty("visibility", "hidden");
    } else if (field === "password") {
      passwordIconRef.current?.style.setProperty("visibility", "hidden");
    }

    return setFocus;
  };

  const checkPassword = (newPassword: string) => {
    console.log("받은 비밀번호", newPassword);

    if (user?.password === newPassword) {
      console.log("비밀번호 확인 완료");
    } else {
      console.log("비밀번호 확인 실패");
    }
  };

  // 비밀번호 확인하기
  const handleCheckPassword = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    window.alert("현재 비밀번호 확인");

    // 완료되면
    setPassword("");
  };

  const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value.trim();
    console.log(id, value);

    if (!user) return;

    const userpic = id === "userpic" ? value : user?.userpic;
    const nickname = id === "nickname" ? value : user?.nickname;
    const intro = id === "intro" ? value : user?.intro;

    const newProfile = {
      userpic,
      nickname,
      intro,
    };

    setProfile(newProfile);
  };

  const hanldeChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();

    setPassword(value);
  };

  const handleUpdatePassword = () => {
    if (!window.confirm(`입력한 비밀번호로 변경하시겠습니까?`)) {
      return;
    }

    // 비밀번호 업데이트 API 호출
    updatePasswordAPI(password)
      .then((res) => {
        if (!res) {
          return;
        }

        if (res.status === 200) {
          setPassword(`***********************************`); // 비밀번호 입력 필드 초기화
          //   setMessage(fetchMessage(4, proflieMsgs)); // 업데이트 성공 알림
        }
      })
      .catch((err) => {
        // setMessage(fetchMessage(err.msgId, proflieMsgs));
      });
  };

  const handleUpdateProfile = () => {
    if (!window.confirm(`프로필을 수정하시겠습니까?`)) {
      return;
    }

    updateProfileAPI(profile)
      .then((res) => {
        if (res.data.code === "ok") {
          window.alert(`업데이트가 완료되었습니다.`);
          if (!user) return;
          if (!profile) return;

          const updatedUser = {
            ...user,
            userpic: profile.userpic,
            nickname: profile.nickname,
            intro: profile.intro,
          };
          setUser(updatedUser);
        }
      })
      .catch((err) => {
        console.log(err.msgId);

        // setMessage(fetchMessage(err.msgId, proflieMsgs));
      });
  };

  // 회원 탈퇴
  const handleLeave = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!window.confirm(`회원 탈퇴를 하시겠습니까?`)) {
      return;
    }

    // 비밀번호 확인
    handleCheckPassword(e);

    // 백연결
    // 결과 통보
  };

  const visible =
    (profile.intro.length !== 0 ||
      profile.userpic.length !== 0 ||
      profile.nickname.length !== 0) &&
    (user?.userpic !== profile.userpic ||
      user?.nickname !== profile.nickname ||
      user?.intro !== profile.intro);

  if (loading) {
    return (
      <div className="mypage-mobile-profile-loading">
        <p>loading...</p>
        <p></p>
      </div>
    );
  }

  return (
    <>
      <div className="mypage-profile-modal"></div>
      <div className="mypage-profile">
        <ul className="mypage-profile-container">
          <li className="mypage-profile-photo">
            <div className="mypage-profile-photo-container">
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
                  user && user.userpic !== ""
                    ? user.userpic
                    : profile.userpic
                    ? profile.userpic
                    : "/images/defaultImage.jpg"
                }
                alt="프로필 사진"
              />
              <figure
                className="mypage-profile-photo-icon"
                onClick={handleClickImage}
                title="수정"
              >
                <LuPencil />
              </figure>
            </div>
          </li>
          {profileForm.map((item) => {
            return (
              <li
                className={`mypage-profile-item ${
                  (item.title === "updateProfile" && !visible) ||
                  (item.title === "updatePassword" && !password)
                    ? "btn-hidden" // 버튼 숨기기
                    : "btn-visible" // 버튼 보이기
                }`}
                key={item.title}
              >
                <span className="mypage-profile-detail">
                  <p className="mypage-profile-detail-title">{item.name}</p>
                  <input
                    className="mypage-profile-detail-data"
                    type="text"
                    placeholder={
                      item.title === "intro" && user?.[`intro`]?.length === 0
                        ? "소개글을 작성해주세요"
                        : item.title === "password"
                        ? "*************************"
                        : undefined
                    }
                    id={item.title}
                    ref={
                      item.title === "nickname"
                        ? nicknameRef
                        : item.title === "intro"
                        ? introRef
                        : item.title === "password"
                        ? passwordRef
                        : undefined
                    }
                    defaultValue={
                      item.title === "password"
                        ? ""
                        : item.title === "birth" && user
                        ? convertDataToDate(user[`birth`])
                        // : item.title === "regdate" && user
                        // ? convertDataToDate(user[`regdate`])
                        : item.title === "role" &&
                          user?.[`role`] === "ROLE_USER"
                        ? "일반회원"
                        : item.title === "role" &&
                          user?.[`role`] === "ROLE_ADMIN"
                        ? "관리자"
                        : item.title === "role" &&
                          user?.[`role`] === "ROLE_A" &&
                          user?.[`endDate`]
                        ? `일반회원(7일 정지[${convertDataToDate(
                            user?.[`endDate`]
                          )} 종료])`
                        : item.title === "role" &&
                          user?.[`role`] === "ROLE_B" &&
                          user?.[`endDate`]
                        ? `일반회원(30일 정지[${convertDataToDate(
                            user?.[`endDate`]
                          )} 종료])`
                        : item.title === "role" &&
                          user?.[`role`] === "ROLE_C" &&
                          user?.[`endDate`]
                        ? "정지회원(영구 정지)"
                        : item.title === "role" && user?.[`role`] === "ROLE_D"
                        ? "탈퇴 회원"
                        : user?.[`${item.title}` as keyof UserType]
                    }
                    disabled
                    onChange={
                      item.title === "password"
                        ? (e) => hanldeChangePassword(e)
                        : (e) => handleChangeProfile(e)
                    }
                  />
                </span>
                {item.edit &&
                item.title !== "updateProfile" &&
                item.title !== "updatePassword" ? (
                  <span
                    className="mypage-profile-edit"
                    data-edit={item.title}
                    ref={
                      item.title === "nickname"
                        ? nickIconRef
                        : item.title === "intro"
                        ? introIconRef
                        : item.title === "password"
                        ? passwordIconRef
                        : undefined
                    }
                    onClick={
                      item.title === "password"
                        ? (e) => handleCheckPassword(e)
                        : (e) => handleCheckProfile(e)
                    }
                    title="수정"
                  >
                    <LuClipboardEdit />
                  </span>
                ) : item.edit && item.title === "updateProfile" ? (
                  <span
                    className="mypage-profile-update"
                    onClick={() => handleUpdateProfile()}
                  >
                    내 정보 수정하기
                  </span>
                ) : (
                  item.edit &&
                  item.title === "updatePassword" && (
                    <span
                      className="mypage-profile-update"
                      onClick={() => handleUpdatePassword()}
                    >
                      비밀번호 변경하기
                    </span>
                  )
                )}
              </li>
            );
          })}
          <li className="mypage-profile-item leave">
            <span
              className="mypage-profile-leave"
              onClick={(e) => handleLeave(e)}
            >
              회원탈퇴
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MypageProfile;
