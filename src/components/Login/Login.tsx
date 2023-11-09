import React, { useState } from 'react';
import Header from '../Header/Header';
import Input from '../../common/Input/Input';
import { MoonLoader } from 'react-spinners';
import Button from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services';
import { useDispatch } from 'react-redux';
import { LoginResponseInterface } from '../../interfaces/Services.interface';

const Login = (): JSX.Element => {
	const navigate = useNavigate();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<string>('');

	const dispatch = useDispatch();

	const sendToLocalStorage = (response: LoginResponseInterface): void => {
		localStorage.setItem('token', response.result);
		localStorage.setItem('name', response.user.name);
		localStorage.setItem('email', response.user.email);
	};

	const sendToRedux = (response: LoginResponseInterface): void => {
		dispatch({
			type: 'LOGIN',
			payload: {
				...response.user,
				token: response.result,
				isAuth: true,
			},
		});
	};

	const onSubmit = async (): Promise<void> => {
		try {
			setLoading(true);
			const response = await login(email, password);
			sendToLocalStorage(response);
			sendToRedux(response);
			showSuccess();
			redirect();
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (error.response) {
				setError(error.response.data.result);
			} else {
				setError("Error with the server's response");
			}
		} finally {
			setLoading(false);
		}
	};

	const validateForm = (): boolean => {
		if (email.length < 2) {
			setError('Email must be at least 2 characters');
			return false;
		} else if (password.length < 2) {
			setError('Password must be at least 2 characters');
			return false;
		} else {
			return true;
		}
	};

	const showSuccess = (): void => {
		if (localStorage.getItem('token')) {
			setSuccess(`Welcome ${localStorage.getItem('name')}`);
		}
	};

	const redirect = (): void => {
		setTimeout(() => {
			navigate('/courses');
		}, 1500);
	};

	return (
		<>
			<Header />
			<section className='flex items-center justify-center h-[80vh]'>
				<div className='flex flex-col gap-6'>
					<h2 className='text-2xl'>Login</h2>
					<form
						className='flex flex-col gap-3'
						onSubmit={(e) => {
							e.preventDefault();
							if (validateForm()) {
								onSubmit();
							}
						}}
					>
						<Input
							className='border border-solid border-gray-300 rounded-md py-1 px-2'
							id='registrationEmail'
							type='email'
							label='Email'
							minLength={2}
							placeHolder='Enter your email'
							onChange={(e) => {
								e.target.value.length > 2
									? setEmail(e.target.value)
									: setEmail('');
							}}
						/>
						<Input
							className='border border-solid border-gray-300 rounded-md py-1 px-2'
							id='registrationPassword'
							type='password'
							minLength={2}
							placeHolder='Enter a password'
							label='Password'
							onChange={(e) => {
								e.target.value.length > 2
									? setPassword(e.target.value)
									: setPassword('');
							}}
						/>
						{loading ? (
							<div className='flex justify-center'>
								<MoonLoader color='#36d7b7' />
							</div>
						) : (
							<Button
								buttonText='Login'
								type='submit'
								className='bg-cyan-500 py-1 rounded-md text-white'
							/>
						)}
						{error && <p className='text-red-500'>{error}</p>}
						{success && <p className='text-green-500'>{success}</p>}
					</form>
					<p>
						If you not have an account you can{' '}
						<Link to={'/registration'} className='text-blue-700'>
							Registration
						</Link>
					</p>
				</div>
			</section>
		</>
	);
};

export default Login;
