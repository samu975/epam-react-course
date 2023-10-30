import { UserActionTypes, UserType, UserActions } from "./types";

export const initUserState = {
  name: "",
  email: "",
  token: "",
  isAuth: false,
};

export const userReducer = (
  state = initUserState,
  action: UserActions
): UserType => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return action.payload;
    case UserActionTypes.LOGOUT:
      return initUserState;
    default:
      return state;
  }
};
