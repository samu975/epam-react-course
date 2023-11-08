import React, { useState, useEffect, useCallback } from 'react';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services';

const Header = (): JSX.Element => {
	const navigate = useNavigate();

	const [logged, setLogged] = useState<boolean>(false);
	const [name, setName] = useState<string | null>(null);
	const [tokenLocalStorage] = useState<string | null>(
		localStorage.getItem('token')
	);

	const getTokenFromLocalStorage = (): void => {
		if (localStorage.getItem('token')) {
			setLogged(true);
		}
	};

	const getNameFromLocalStorage = useCallback(() => {
		if (logged) {
			setName(localStorage.getItem('name'));
		}
	}, [logged]);

	const Logout = (token: string): void => {
		logout(token)
			.then(() => {
				localStorage.removeItem('token');
				localStorage.removeItem('name');
				localStorage.removeItem('email');
				localStorage.removeItem('role');
				setLogged(false);
				setName(null);
				navigate('/');
			})
			.catch((error) => {
				// eslint-disable-next-line
				console.error(error);
			});
	};

	useEffect(() => {
		getTokenFromLocalStorage();
		getNameFromLocalStorage();
	}, [getNameFromLocalStorage, getTokenFromLocalStorage]);

	return (
		<header className='w-full flex justify-between px-8 py-4 border border-solid '>
			<div>
				<Logo />
			</div>
			<div className='flex gap-8 items-center'>
				{logged ? (
					<>
						<h3>{name}</h3>
						<Button
							buttonText='Logout'
							className='bg-red-500 text-white px-4 py-2 rounded'
							onClick={() => {
								if (tokenLocalStorage) {
									Logout(tokenLocalStorage);
								}
								navigate('/');
							}}
						/>
					</>
				) : (
					<>
						<Link to='/login'>Login</Link>
						<Link to='/registration'>Registration</Link>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
