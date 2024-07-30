import { deletePostsAAPI, fetchPostsAAPI } from "apis/post";
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
      deleteAPI={deletePostsAAPI}
      defaultSort={["postDate", "desc"]}
      defaultSize={3}
      defaultField={{ name: "postDate" }}
      tempArray={postsAArray}
      msgArray={postsMsgs}
      settings={["삭제"]}
    />
  );
};

export default PostsA;
