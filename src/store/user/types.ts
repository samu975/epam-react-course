export type UserType = {
	name: string;
	email: string;
	token: string;
	isAuth: boolean;
	role: string;
};

export enum UserActionTypes {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	GET_OWN_INFO = 'GET_OWN_INFO',
}

export type LoginAction = {
	type: UserActionTypes.LOGIN;
	payload: UserType;
};

export type LogoutAction = {
	type: UserActionTypes.LOGOUT;
};

export type GetOwnInfoAction = {
	type: UserActionTypes.GET_OWN_INFO;
	payload: UserType;
};

export type UserActions = LoginAction | LogoutAction | GetOwnInfoAction;
