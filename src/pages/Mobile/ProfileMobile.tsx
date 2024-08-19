import { useEffect, useRef, useState } from "react";
import "./profileMobile.css";
import { ProfileType, UserType } from "types/users";
import useHandleClickImage from "../mypage/hooks/useHandleClickImage";
import { profileForm, userData } from "test/data/profile";
import { convertDataToDate } from "utilities/profile";
import { LuPencil, LuClipboardEdit } from "react-icons/lu";
import { updatePasswordAPI, updateProfileAPI } from "apis/profile";
import { MessageType } from "types/template";
import { fetchMessage } from "templates/utilities/template";
import { proflieMsgs } from "templates/data/message";
import MobileModal from "./MobileModal";

const ProfileMobile = () => {
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
  const [message, setMessage] = useState<MessageType | undefined>();
  const handleClickImage = useHandleClickImage(imageRef);

  // api에서 user 데이터 가져오기
  useEffect(() => {
    setUser(userData);
  }, []);

  // 데이터 수정 여부 확인하기
  const handleCheckProfile = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const field = e.currentTarget.dataset.edit
      ? e.currentTarget.dataset.edit
      : "";
    setMessage({
      msgId: 1,
      type: "confirm",
      msgs: {
        header: "수정하시겠습니끼?",
        main: "",
      },
      func: (field) => setFocus(field),
      params: field,
    });
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

    setMessage(undefined);

    return setFocus;
  };

  const checkPassword = (newPassword: string) => {
    console.log("받은 비밀번호", newPassword);

    if (userData.password === newPassword) {
      console.log("비밀번호 확인 완료");

      setMessage({
        msgId: 3,
        type: "alert",
        msgs: {
          header: "비밀번호가 확인되었습니다.",
          main: "",
        },
        func: () => setFocus("password"),
        params: "password",
      });
    } else {
      console.log("비밀번호 확인 실패");
      setMessage({
        msgId: 4,
        type: "alert",
        msgs: {
          header: "비밀번호가 다릅니다.",
          main: "",
        },
      });
    }
  };

  // 비밀번호 확인하기
  const handleCheckPassword = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    // window.alert("현재 비밀번호 확인");
    setMessage({
      msgId: 2,
      type: "confirm",
      msgs: {
        header: "현재 비밀번호 확인",
        main: (
          <input
            className="mobile-modal-message-main active check-password"
            type="password"
            onChange={(e) => hanldeChangePassword(e)}
            autoFocus
          />
        ),
      },
      func: (sth) => checkPassword(sth),
    });

    // 완료되면
    // setPassword("");
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
          setMessage(fetchMessage(4, proflieMsgs)); // 업데이트 성공 알림
        }
      })
      .catch((err) => {
        setMessage(fetchMessage(err.msgId, proflieMsgs));
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

        setMessage(fetchMessage(err.msgId, proflieMsgs));
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

  // 모달창이 열리면 스크롤이 안되게 조정
  if (message) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

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
      {message?.msgs.header ? (
        <MobileModal
          message={message}
          setMessage={setMessage}
          password={password}
        />
      ) : undefined}
      <div className="mypage-mobile-profile">
        <div className="mypage-mobile-profile-title">개인 정보</div>
        <ul className="mypage-mobile-profile-container">
          <li className="mypage-mobile-profile-photo">
            <div className="mypage-mobile-profile-photo-container">
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
                    : "/images/defaultImage.jpg"
                }
                alt="프로필 사진"
              />
              <figure
                className="mypage-mobile-profile-photo-icon"
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
                className={`mypage-mobile-profile-item ${
                  (item.title === "updateProfile" && !visible) ||
                  (item.title === "updatePassword" && !password)
                    ? "btn-hidden" // 버튼 숨기기
                    : "btn-visible" // 버튼 보이기
                }`}
                key={item.title}
              >
                <span className="mypage-mobile-profile-detail">
                  <p className="mypage-mobile-profile-detail-title">
                    {item.name}
                  </p>
                  <input
                    className="mypage-mobile-profile-detail-data"
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
                        : item.title === "regdate" && user
                        ? convertDataToDate(user[`regdate`])
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
                    className="mypage-mobile-profile-edit"
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
                    className="mypage-mobile-profile-update"
                    onClick={() => handleUpdateProfile()}
                  >
                    내 정보 수정하기
                  </span>
                ) : (
                  item.edit &&
                  item.title === "updatePassword" && (
                    <span
                      className="mypage-mobile-profile-update"
                      onClick={() => handleUpdatePassword()}
                    >
                      비밀번호 변경하기
                    </span>
                  )
                )}
              </li>
            );
          })}
          <li className="mypage-mobile-profile-item leave">
            <span
              className="mypage-mobile-profile-leave"
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

export default ProfileMobile;
