import TemplateA from "templates/admin/TemplateA";
import "./postM.css";
import { deletePostsMAPI, fetchPostsMAPI } from "apis/post";
import { postsMsgs } from "templates/data/message";
import { postsMArray } from "templates/data/template";
import Template from "templates/mypage/Template";
import MoblieTemplateM from "templates/Moblie/MoblieTemplateM";
import { deleteSchedulesMAPI, fetchSchedulesMAPI } from "apis/schedule";
import MobilePostCard from "templates/Moblie/MobilePostCard";
import { postsArray } from "test/data/posts";

const PostsM = () => {
  return (
    <>
      <MoblieTemplateM
        pageName="mypage-posts"
        title={"모집글 목록"}
        fetchAPI={fetchSchedulesMAPI}
        deleteAPI={deleteSchedulesMAPI}
        defaultSort={["postDate", "desc"]}
        defaultSize={10}
        defaultField={{ name: "postTitle" }}
        tempArray={postsMArray}
        msgArray={postsMsgs}
        tempoArray={postsArray}
      />
      <Template
        pageName="mypage-posts"
        title={"모집글 목록"}
        fetchAPI={fetchPostsMAPI}
        deleteAPI={deletePostsMAPI}
        defaultSort={["postDate", "desc"]}
        defaultSize={3}
        defaultField={{ name: "postDate" }}
        tempArray={postsMArray}
        msgArray={postsMsgs}
      />
    </>
  );
};

export default PostsM;
