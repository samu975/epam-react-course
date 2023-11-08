import { UserType } from '../store/user/types';

export const isAdmin = (user: UserType): boolean => {
	if (user.role === 'admin') {
		return true;
	}
	return false;
};
