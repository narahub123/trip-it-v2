import React, { useCallback } from "react";
import { ProfileType } from "types/users";
import { debounce } from "utilities/debounce";
import { handleProfileChange } from "../utilities/profile";

export const useDebouncedProfileChange = (
  profile: ProfileType,
  setProfile: (value: ProfileType) => void
) => {
  console.log("프로필 변경 렌더링");

  return useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      handleProfileChange(e, profile, setProfile);
    }, 500),
    [profile]
  );
};
