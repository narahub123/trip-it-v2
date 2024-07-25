import { blockUserAPI } from "apis/block";
import "./test.css";

const Test = () => {
  const addBlock = (userId: string) => {
    blockUserAPI(userId)
      .then((res) => {
        console.log(res?.data);
        if (!res) return;

        alert("차단 성공");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="test">
      <p onClick={() => addBlock("669f76aca538b8fe9c70ad97")}>차단</p>
    </div>
  );
};

export default Test;
