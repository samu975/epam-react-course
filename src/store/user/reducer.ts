import { UserActionTypes, UserType, UserActions } from './types';

export const initUserState = {
	name: '',
	email: '',
	token: '',
	isAuth: false,
	role: '',
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
		case UserActionTypes.GET_OWN_INFO:
			return action.payload;
		default:
			return state;
	}
};
