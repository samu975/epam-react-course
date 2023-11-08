import React from 'react';
import Header from '../components/Header/Header';
import CourseForm from '../components/CourseForm/CourseForm';
import Button from '../common/Button/Button';
import { useNavigate } from 'react-router-dom';

const AddNewCourse = (): JSX.Element => {
	const navigate = useNavigate();
	return (
		<>
			<Header />
			<CourseForm />
			<div className='w-full flex justify-center my-8'>
				<Button
					buttonText='Cancel'
					className='bg-red-500 p-2 text-white rounded-md '
					onClick={() => {
						navigate('/courses');
					}}
				/>
			</div>
		</>
	);
};

export default AddNewCourse;
