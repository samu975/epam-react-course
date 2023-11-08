import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { isAdmin } from '../../helpers/isAdmin';
import { Navigate } from 'react-router';

interface Props {
	children: JSX.Element;
}

const PrivateRouteAdmin = ({ children }: Props): JSX.Element => {
	const user = useSelector((state: RootState) => state.user);
	let auth = false;

	if (user.role !== '') {
		auth = isAdmin(user);
	} else {
		auth = localStorage.getItem('role') === 'admin';
	}
	return <>{auth ? children : <Navigate to={'/courses'} />}</>;
};

export default PrivateRouteAdmin;
