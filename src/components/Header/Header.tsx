import React, { useState, useEffect, useCallback } from 'react';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';

const Header = (): JSX.Element => {
	const navigate = useNavigate();

	const [logged, setLogged] = useState<boolean>(false);
	const [name, setName] = useState<string | null>(null);

	const getFromLocalStorage = (): void => {
		if (localStorage.getItem('token')) {
			setLogged(true);
		}
	};

	const getNameFromLocalStorage = useCallback(() => {
		if (logged) {
			setName(localStorage.getItem('name'));
		}
	}, [logged]);

	const Logout = (): void => {
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		localStorage.removeItem('email');
		setLogged(false);
	};

	useEffect(() => {
		getFromLocalStorage();
		getNameFromLocalStorage();
	}, [getNameFromLocalStorage]);

	return (
		<header className='w-full flex justify-between px-8 py-4 border border-solid '>
			<div
				onClick={() => {
					navigate('/');
				}}
				className='cursor-pointer'
			>
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
								Logout();
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
