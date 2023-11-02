import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Header from '../Header/Header';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';

const Registration = (): JSX.Element => {
	const navigate = useNavigate();

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<string>('');

	const submitForm = (): void => {
		setLoading(true);
		axios
			.post('http://localhost:4000/register', {
				name: name,
				email: email,
				password: password,
			})
			.then((response) => {
				setSuccess(response.data.result);
				setLoading(false);
				redirect();
			})
			.catch((error) => {
				setError(error.response.data.errors[0]);
			});
	};

	const validateForm = (): boolean => {
		if (name.length < 2) {
			setError('Name must be at least 2 characters');
			return false;
		} else if (email.length < 2) {
			setError('Email must be at least 2 characters');
			return false;
		} else if (password.length < 2) {
			setError('Password must be at least 2 characters');
			return false;
		} else {
			return true;
		}
	};

	const redirect = (): void => {
		setTimeout(() => {
			navigate('/login');
		}, 3000);
	};

	return (
		<>
			<Header />
			<section className='flex items-center justify-center h-[80vh]'>
				<div className='flex flex-col gap-6'>
					<h2 className='text-2xl'>Registration</h2>
					<form
						className='flex flex-col gap-3'
						onSubmit={(e) => {
							e.preventDefault();
							if (validateForm()) {
								submitForm();
							}
						}}
					>
						<Input
							className='border border-solid border-gray-300 rounded-md py-1 px-2'
							id='registrationName'
							type='text'
							minLength={2}
							label='Name'
							placeHolder='Enter your name'
							onChange={(e) => {
								e.target.value.length > 2
									? setName(e.target.value)
									: setName('');
							}}
						/>
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
								buttonText='Registration'
								type='submit'
								className='bg-cyan-500 py-1 rounded-md text-white'
							/>
						)}
						{error && <p className='text-red-500'>{error}</p>}
						{success && <p className='text-green-500'>{success}</p>}
					</form>
					<p>
						If you have an account you can{' '}
						<Link to={'/login'} className='text-blue-700'>
							Login
						</Link>
					</p>
				</div>
			</section>
		</>
	);
};

export default Registration;
