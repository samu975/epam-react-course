import { UserActionTypes, UserType } from "./types";

export const loginAction = (userData: UserType) => ({
  type: UserActionTypes.LOGIN,
  payload: userData,
});

export const logoutAction = () => ({
  type: UserActionTypes.LOGOUT,
});
