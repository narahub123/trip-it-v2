import { useCallback } from "react";
import { debounce } from "utilities/debounce";
import { handleChangePassword } from "../utilities/profile";

export const useDebouncedHandleChangePassword = (
  password: string,
  setPassword: (value: string) => void
) => {
  console.log("비밀번호 변경 렌더링");

  return useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      handleChangePassword(e, setPassword);
    }, 500),
    [password]
  );
};
