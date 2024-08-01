import { UserType } from "types/users";

export const userData: UserType = {
  userpic: "",
  nickname: "해린1",
  intro: "",
  birth: "20060515",
  email: "test1@gmail.com",
  gender: "f",
  userId: 1,
  password: "test@1234",
  regdate: "20240729",
  reportCount: 3,
  role: "ROLE_A",
  username: "강해린",
  endDate: "20240822",
};

export const profileForm = [
  {
    title: "nickname",
    name: "닉네임",
    edit: true,
  },
  {
    title: "intro",
    name: "소개글",
    edit: true,
  },
  {
    title: "updateProfile",
    name: "",
    edit: true,
  },
  {
    title: "password",
    name: "비밀번호",
    edit: true,
  },
  {
    title: "updatePassword",
    name: "",
    edit: true,
  },
  {
    title: "username",
    name: "이름",
    edit: false,
  },
  {
    title: "birth",
    name: "생년월일",
    edit: false,
  },
  {
    title: "email",
    name: "이메일",
    edit: false,
  },
  {
    title: "regdate",
    name: "등록일",
    edit: false,
  },
  {
    title: "reportCount",
    name: "신고수",
    edit: false,
  },
  {
    title: "role",
    name: "등급",
    edit: false,
  },
];
