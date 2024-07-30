import { fetchUserAPI, updateUserRole } from "apis/users";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageType } from "types/template";
import { UserType } from "types/users";
import { convertDataToDate } from "utilities/profile";
import "./user.css";
import { fetchMessage } from "templates/utilities/template";
import { userMsgs } from "templates/data/message";
import MessageModal from "templates/components/MessageModal";

const User = () => {
  const [user, setUser] = useState<UserType>();
  const [message, setMessage] = useState<MessageType>();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();
  const userId = pathname.split("/")[3];

  useEffect(() => {
    fetchUserAPI(userId)
      .then((res) => setUser(res?.data))
      .catch((err) => {
        console.log(err);
        setMessage(fetchMessage(err.msgId, userMsgs));
      });
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChangeRole = (role: string) => {
    if (!window.confirm(`등급을 변경하시겠습니까?`)) {
      return;
    }
    updateUserRole(userId, role)
      .then((res) => {
        if (res.data.code === "ok") {
          setMessage(fetchMessage(6, userMsgs));
          if (!user) return;
          const newUser = {
            ...user,
            role,
          };

          setUser(newUser);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage(fetchMessage(err.msgId, userMsgs));
      });
  };

  return (
    <>
      {message && <MessageModal message={message} setMessage={setMessage} />}
      <div className="admin-user">
        <div className="admin-user-container">
          <table className="admin-user-table">
            <thead>
              <tr>
                <td colSpan={3}>
                  <h3>개인정보</h3>
                </td>
              </tr>
            </thead>
            {loading && (
              <tbody className="admin-user-body">
                <tr className="admin-user-body-row">
                  <td className="admin-user-body-td" colSpan={3}>
                    loading...
                  </td>
                </tr>
              </tbody>
            )}
            <tbody className="admin-user-body">
              <tr className="admin-user-body-row">
                <td className="admin-user-body-td" rowSpan={2}>
                  <img
                    src={
                      user?.userpic.length !== 0
                        ? user?.userpic
                        : "/images/defaultImage.jpg"
                    }
                    alt="프로필 사진"
                  />
                </td>
                <td className="admin-user-body-td">
                  <input
                    type="text"
                    id="nickname"
                    defaultValue={user?.nickname}
                    disabled
                  />
                </td>
              </tr>
              <tr className="admin-user-body-row">
                <td className="admin-user-body-td">
                  <input
                    type="text"
                    id="intro"
                    defaultValue={user?.intro}
                    disabled
                  />
                </td>
              </tr>
              <tr className="admin-user-body-row">
                <th className="admin-user-body-th">이름</th>
                <td className="admin-user-body-td">
                  <input
                    type="text"
                    value={user?.username || ""}
                    readOnly
                    disabled
                  />
                </td>
                <td className="admin-user-body-td"></td>
              </tr>
              <tr className="admin-user-body-row">
                <th className="admin-user-body-th">비밀번호</th>
                <td className="admin-user-body-td">
                  <input
                    type="password"
                    defaultValue={"****************"}
                    disabled
                  />
                </td>
              </tr>
              <tr className="admin-user-body-row">
                <th className="admin-user-body-th">이메일</th>
                <td className="admin-user-body-td">
                  <input
                    type="text"
                    value={user?.email || ""}
                    readOnly
                    disabled
                  />
                </td>
                <td className="admin-user-body-td"></td>
              </tr>
              <tr className="admin-user-body-row">
                <th className="admin-user-body-th">성별</th>
                <td className="admin-user-body-td">
                  <input
                    type="text"
                    value={user?.gender === "m" ? "남성" : "여성"}
                    readOnly
                    disabled
                  />
                </td>
                <td className="admin-user-body-td"></td>
              </tr>
              <tr className="admin-user-body-row">
                <th className="admin-user-body-th">생년월일</th>
                <td className="admin-user-body-td">
                  <input
                    type="text"
                    value={user ? convertDataToDate(user?.birth) : ""}
                    readOnly
                    disabled
                  />
                </td>
                <td className="admin-user-body-td"></td>
              </tr>
              <tr className="admin-user-body-row">
                <th className="admin-user-body-th">가입일</th>
                <td className="admin-user-body-td">
                  <input
                    type="text"
                    value={user ? convertDataToDate(user?.regdate) : ""}
                    readOnly
                    disabled
                  />
                </td>
                <td className="admin-user-body-td"></td>
              </tr>
              <tr className="admin-user-body-row">
                <th className="admin-user-body-th">신고당한 횟수</th>
                <td className="admin-user-body-td">
                  <input
                    type="text"
                    value={user?.reportCount || 0}
                    readOnly
                    disabled
                  />
                </td>
                <td className="admin-user-body-td"></td>
              </tr>
              <tr className="admin-user-body-row">
                <th className="admin-user-body-th">등급</th>
                <td className="admin-user-body-td" onClick={handleOpen}>
                  <input
                    type="text"
                    value={user?.role === "ROLE_USER" ? "사용자" : "관리자"}
                    readOnly
                  />
                  {open && (
                    <ul className="admin-user-role-container">
                      <li onClick={() => handleChangeRole("ROLE_ADMIN")}>
                        관리자
                      </li>
                      <li onClick={() => handleChangeRole("ROLE_USER")}>
                        사용자
                      </li>
                      <li onClick={() => handleChangeRole("ROLE_USER")}>
                        사용자(15일 정지)
                      </li>
                      <li onClick={() => handleChangeRole("ROLE_USER")}>
                        사용자(30일 정지)
                      </li>
                      <li onClick={() => handleChangeRole("ROLE_USER")}>
                        사용자(영구 정지)
                      </li>
                    </ul>
                  )}
                </td>
                <td className="admin-user-body-td"></td>
              </tr>
              <tr style={{ height: "100px" }}></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default User;
