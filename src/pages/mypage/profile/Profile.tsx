import { useEffect, useState } from "react";
import "./profile.css";
import { fetchProfileAPI } from "apis/mypage/profile";
import { UserType } from "types/users";
import { convertDataToDate } from "utilities/profile";

const Profile = () => {
  const [user, setUser] = useState<UserType>();
  // 사용자 프로필 정보 얻기
  useEffect(() => {
    fetchProfileAPI()
      .then((res) => {
        console.log(res.data);

        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mypage-profile">
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
                <input type="text" defaultValue={user?.nickname} />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <td className="mypage-profile-body-td" colSpan={2}>
                <textarea
                  name=""
                  id=""
                  defaultValue={user?.intro}
                  placeholder="소개글을 작성해주세요"
                />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">이름</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input type="text" defaultValue={user?.username} disabled />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">비밀번호</th>
              <td className="mypage-profile-body-td">
                <input type="password" defaultValue={user?.password} disabled />
              </td>
              <td>
                <button>수정</button>
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">이메일</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input type="text" defaultValue={user?.email} disabled />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">성별</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input
                  type="text"
                  defaultValue={user?.gender === "m" ? "남성" : "여성"}
                  disabled
                />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">생년월일</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input
                  type="text"
                  defaultValue={user ? convertDataToDate(user?.birth) : ""}
                  disabled
                />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">가입일</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input type="text" defaultValue={user?.regdate} disabled />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">신고당한 횟수</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input type="text" defaultValue={user?.reportCount} disabled />
              </td>
            </tr>
            <tr className="mypage-profile-body-row">
              <th className="mypage-profile-body-th">등급</th>
              <td className="mypage-profile-body-td" colSpan={2}>
                <input
                  type="text"
                  defaultValue={
                    user?.role === "ROLE_USER" ? "사용자" : "관리자"
                  }
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
