import { fetchPostsAAPI } from "apis/post";
import React from "react";
import TemplateA from "templates/admin/TemplateA";
import { postsMsgs } from "templates/data/message";
import { postsAArray } from "templates/data/template";

const PostsA = () => {
  return (
    <TemplateA
      pageName="posts"
      title={"모집글 목록"}
      fetchAPI={fetchPostsAAPI}
      defaultSort={["postDate", "desc"]}
      defaultSize={3}
      defaultField={{ name: "postDate" }}
      tempArray={postsAArray}
      msgArray={postsMsgs}
    />
  );
};

export default PostsA;
 