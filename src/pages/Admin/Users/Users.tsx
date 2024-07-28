import { fetchUsersAPI } from "apis/users";
import React from "react";
import TemplateA from "templates/admin/TemplateA";
import { userMsgs } from "templates/data/message";
import { usersArray } from "templates/data/template";

const Users = () => {
  return (
    <TemplateA
      pageName="users"
      title={"유저 목록"}
      fetchAPI={fetchUsersAPI}
      defaultSort={["regdate", "desc"]}
      defaultSize={3}
      defaultField={{ name: "regdate" }}
      tempArray={usersArray}
      msgArray={userMsgs}
    />
  );
};

export default Users;
