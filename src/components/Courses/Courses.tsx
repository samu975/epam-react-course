import React, { useEffect, useCallback } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { deleteCourseAction } from '../../store/courses/actions';
import { getAuthors, getCourses } from '../../services';

const Courses = (): JSX.Element => {
	const dispatch = useDispatch();
	const authors = useSelector((state: RootState) => state.authors);
	const courses = useSelector((state: RootState) => state.courses);

	const navigate = useNavigate();

	// La solucion que propuse fue esta. En ese momento no sabia que eran los thunks, asi que por eso esta así, pero funciona.
	const fetchCourses = useCallback(async () => {
		try {
			const response = await getCourses();
			dispatch({
				type: 'GET_COURSES',
				payload: response.result,
			});
		} catch (error) {
			// eslint-disable-next-line
			console.error(error);
		}
	}, [dispatch]);

	const fetchAuthors = useCallback(async () => {
		try {
			const response = await getAuthors();
			dispatch({
				type: 'GET_AUTHORS',
				payload: response.result,
			});
		} catch (error) {
			// eslint-disable-next-line
			console.error(error);
		}
	}, [dispatch]);

	const deleteCourse = (id: string): void => {
		dispatch(deleteCourseAction(id));
	};

	useEffect(() => {
		if (authors.length === 0) {
			fetchAuthors();
		}
		if (courses.length === 0) {
			fetchCourses();
		}

		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
		}
	}, [fetchAuthors, fetchCourses, authors.length, courses.length, navigate]);

	return (
		<>
			<Header />
			<section
				data-testid='course-card'
				className='p-4 w-full flex justify-between'
			>
				<div>
					<Input
						id='searchInput'
						className='border-solid border border-gray-400 w-72 p-2 text-sm'
						type='text'
					/>
					<Button
						buttonText='Search'
						className='py-2 px-8 ml-4 rounded-md bg-blue-700 text-white'
						disabled
					/>
				</div>
				<div>
					<Button
						buttonText='Add new course'
						onClick={() => {
							navigate('/courses/add');
						}}
						className='py-2 px-8 rounded-md bg-cyan-500 text-white'
					/>
				</div>
			</section>
			<div>
				{courses.map((course) => (
					<CourseCard
						id={course.id}
						key={course.title}
						title={course.title}
						description={course.description}
						authors={course.authors}
						duration={course.duration}
						createdAt={course.creationDate}
						deleteCourseFn={() => deleteCourse(course.id)}
					/>
				))}
			</div>
		</>
	);
};

export default Courses;
