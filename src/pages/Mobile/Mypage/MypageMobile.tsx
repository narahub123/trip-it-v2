import { mypageList } from "pages/mypage/data/header";
import "./mypageMobile.css";
import { Link } from "react-router-dom";
import { userData } from "test/data/profile";
import { LuMapPin, LuSiren, LuUsers, LuUserX } from "react-icons/lu";

const MypageMobile = () => {
  return (
    <div className="mobile-mypage">
      <div className="mobile-mypage-container">
        <div className="mobile-mypage-inner">
          {mypageList.map((item) => {
            return (
              <Link to={item.link} className="mobile-mypage-inner-item">
                <div className="mobile-mypage-inner-item-main">
                  {item.title == "개인정보" ? (
                    <img
                      src={
                        userData && userData.userpic !== ""
                          ? userData.userpic
                          : "/images/defaultImage.jpg"
                      }
                      alt="프로필 사진"
                    />
                  ) : (
                    <div className="mobile-mypage-inner-item-main-container">
                      <p>
                        {item.title === "내 일정" ? (
                          <LuMapPin />
                        ) : item.title === "내 모집글" ? (
                          <LuUsers />
                        ) : item.title === "차단 목록" ? (
                          <LuUserX />
                        ) : item.title === "신고 목록" ? (
                          <LuSiren />
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                  )}
                </div>
                <p className="mobile-mypage-inner-item-title">{item.title}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MypageMobile;
