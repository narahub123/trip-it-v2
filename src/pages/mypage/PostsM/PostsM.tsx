import TemplateA from "templates/admin/TemplateA";
import "./postM.css";
import { fetchPostsMAPI } from "apis/post";
import { postsMsgs } from "templates/data/message";
import { postsMArray } from "templates/data/template";
import Template from "templates/mypage/Template";

const PostsM = () => {
  return (
    <Template
      pageName="posts"
      title={"모집글 목록"}
      fetchAPI={fetchPostsMAPI}
      defaultSort={["postDate", "desc"]}
      defaultSize={3}
      defaultField={{ name: "postDate" }}
      tempArray={postsMArray}
      msgArray={postsMsgs}
    />
  );
};

export default PostsM;
