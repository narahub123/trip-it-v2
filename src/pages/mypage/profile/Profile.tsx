import { useEffect, useState } from "react";
import "./profile.css";
import { fetchProfileAPI } from "apis/mypage/profile";
import { UserType } from "types/users";

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

  return <div className="mypage-profile"></div>;
};

export default Profile;
