import { UserActionTypes, UserType } from './types';

export const loginAction = (
	userData: UserType
): { type: string; payload: UserType } => ({
	type: UserActionTypes.LOGIN,
	payload: userData,
});

export const logoutAction = (): { type: string } => ({
	type: UserActionTypes.LOGOUT,
});

export const getOwnInfoAction = (): { type: string } => ({
	type: UserActionTypes.GET_OWN_INFO,
});
