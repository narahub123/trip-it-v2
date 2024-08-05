import { updateProfileAPI } from "apis/profile";
import { useCallback } from "react";
import { proflieMsgs } from "templates/data/message";
import { fetchMessage } from "templates/utilities/template";
import { MessageType } from "types/template";
import { ProfileType, UserType } from "types/users";

// 프로필 수정하기
export const useHandleProfile = (
  user: UserType | undefined,
  profile: ProfileType,
  setMessage: (value: MessageType | undefined) => void,
  setIsShowing: (value: boolean) => void,
  setUser: React.Dispatch<React.SetStateAction<UserType | undefined>>,
  setImagePercent: (value: number) => void
) => {
  console.log("프로필 수정 렌더링");

  return useCallback(() => {
    if (!window.confirm("프로필을 수정하시겠습니까?")) {
      return false;
    }

    const updatedFields: ProfileType = { userpic: "", nickname: "", intro: "" };

    if (user?.userpic !== profile.userpic && profile.userpic.length !== 0) {
      updatedFields.userpic = profile.userpic;
    } else {
      updatedFields.userpic = user ? user.userpic : "";
    }
    if (user?.nickname !== profile.nickname && profile.nickname.length !== 0) {
      updatedFields.nickname = profile.nickname;
    } else {
      updatedFields.nickname = user ? user.nickname : "";
    }
    if (user?.intro !== profile.intro && profile.intro.length !== 0) {
      updatedFields.intro = profile.intro;
    } else {
      updatedFields.intro = user ? user.intro : "";
    }

    updateProfileAPI(updatedFields)
      .then((res) => {
        if (!res) return;

        if (res.status === 200) {
          setMessage(fetchMessage(8, proflieMsgs));
          setIsShowing(false);
          setUser((prevUser) => ({
            userpic: updatedFields.userpic,
            nickname: updatedFields.nickname,
            intro: updatedFields.intro,
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
        setMessage(fetchMessage(err.msgId, proflieMsgs));
      });
  }, [profile]);
};
