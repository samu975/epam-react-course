import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import Header from '../Header/Header';
import { MoonLoader } from 'react-spinners';
import { register } from '../../services';

const Registration = (): JSX.Element => {
	const navigate = useNavigate();

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<string>('');

	const onSubmitForm = async (): Promise<void> => {
		try {
			setLoading(true);
			const response = await register(name, email, password);
			setSuccess(response.result);
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

	// Si solo dejo las validaciones del html se envia el formulario, por eso deje esta validacion tambien.
	const validateForm = (): boolean => {
		if (name.length < 2) {
			setError('Name must be at least 2 characters');
			return false;
		}
		if (email.length < 2) {
			setError('Email must be at least 2 characters');
			return false;
		}
		if (password.length < 2) {
			setError('Password must be at least 2 characters');
			return false;
		}
		return true;
	};

	const redirect = (): void => {
		navigate('/login');
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
								onSubmitForm();
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
