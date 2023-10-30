export type UserType = {
  name: string;
  email: string;
  token: string;
  isAuth: boolean;
};

export enum UserActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export type LoginAction = {
  type: UserActionTypes.LOGIN;
  payload: UserType;
};

export type LogoutAction = {
  type: UserActionTypes.LOGOUT;
};

export type UserActions = LoginAction | LogoutAction;
