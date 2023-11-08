import React from 'react';
import { getUserAuth } from '../../helpers/getUserAuth';
import { Navigate } from 'react-router';

interface Props {
	children: JSX.Element;
}

const PrivateRoute = ({ children }: Props): JSX.Element => {
	const auth = getUserAuth();
	return <>{auth ? children : <Navigate to={'/login'} />}</>;
};

export default PrivateRoute;
