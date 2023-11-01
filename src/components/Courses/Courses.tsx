import React, { useState, useEffect } from 'react';
import CourseCard from './components/CourseCard/CourseCard';
import {
	mockedCoursesList,
	mockedAuthorsList,
} from '../../helpers/mocks/mocks';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';

interface Course {
	title: string;
	authors: {
		id: string;
		name: string;
	}[];
	description: string;
	duration: number;
	creationDate: string;
	id: string;
}

const getAuthorNames = (
	authorIdsOrNames: (string | { id: string; name: string })[]
): { id: string; name: string }[] => {
	return authorIdsOrNames.map((authorIdOrName) => {
		if (typeof authorIdOrName === 'string') {
			const author = mockedAuthorsList.find((a) => a.id === authorIdOrName);
			return author
				? { id: author.id, name: author.name }
				: { id: '', name: authorIdOrName };
		} else {
			return authorIdOrName;
		}
	});
};

const Courses = (): JSX.Element => {
	const [courses, setCourses] = useState(() => {
		return mockedCoursesList.map((course) => ({
			...course,
			authors: getAuthorNames(course.authors),
		}));
	});

	const navigate = useNavigate();

	useEffect(() => {
		const storedCourses = localStorage.getItem('courses');
		if (storedCourses) {
			const parsedCourses: Course[] = JSON.parse(storedCourses);

			// Existia un bug extraño donde duplicaba los cursos, por eso hago este chequeo
			setCourses((prevState) => {
				const combinedCourses = [...prevState, ...parsedCourses];
				const uniqueCourses = Array.from(
					new Set(combinedCourses.map((course) => course.id))
				).map((id) => {
					const course = combinedCourses.find((course) => course.id === id);
					if (!course) {
						throw new Error(`Course not found for id ${id}`);
					}
					return course;
				});

				return uniqueCourses;
			});
		}
	}, []);

	return (
		<>
			<section className='p-4 w-full flex justify-between'>
				<div>
					<Input
						id='searchInput'
						className='border-solid border border-gray-400 w-72 p-2 text-sm'
						type='text'
					/>
					<Button
						buttonText='Search'
						className='py-2 px-8 ml-4 rounded-md bg-blue-700 text-white'
					/>
				</div>
				<div>
					<Button
						buttonText='Add new course'
						onClick={() => {
							navigate('add-new-course');
						}}
						className='py-2 px-8 rounded-md bg-cyan-500 text-white'
					/>
				</div>
			</section>
			<div>
				{courses.map((course) => (
					<CourseCard
						key={course.id}
						title={course.title}
						description={course.description}
						authors={course.authors}
						duration={course.duration}
						createdAt={course.creationDate}
					/>
				))}
			</div>
		</>
	);
};

export default Courses;
