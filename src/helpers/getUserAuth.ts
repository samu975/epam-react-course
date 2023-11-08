export const getUserAuth = (): boolean => {
	const userAuth = localStorage.getItem('token');
	if (!userAuth) {
		return false;
	}
	return true;
};
