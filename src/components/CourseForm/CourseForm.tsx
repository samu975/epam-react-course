import React, { useCallback, useEffect, useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import TextArea from '../../common/TextArea/TextArea';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { addAuthorThunk, deleteAuthorThunk } from '../../store/authors/thunk';
import { AddNewAuthorResponse } from '../../interfaces/Services.interface';
import { AuthorType } from '../../store/authors/types';
import { addCourseThunk, updateCourseThunk } from '../../store/courses/thunk';

const CourseForm = (): JSX.Element => {
	const navigate = useNavigate();
	//eslint-disable-next-line
	const dispatch = useDispatch<any>();
	const { courseId } = useParams();
	const [duration, setDuration] = useState(0);
	const [authorIdList, setAuthorIdList] = useState<string[]>([]);
	const [authorList, setAuthorList] = useState<string[]>([]);
	const [courseTitle, setCourseTitle] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [newAuthorName, setNewAuthorName] = useState('');
	const authors = useSelector((state: RootState) => state.authors);
	const coursesRedux = useSelector((state: RootState) => state.courses);
	const token = localStorage.getItem('token');

	const onClickAddAuthor = (): void => {
		if (
			authors.some(
				(author) => author.name.toLowerCase() === newAuthorName.toLowerCase()
			)
		) {
			alert('This author already exists');
			return;
		}

		const newAuthor: AuthorType = {
			name: newAuthorName,
			id: '',
		};
		if (token) {
			dispatch(addAuthorThunk(token, newAuthor))
				.then((response: AddNewAuthorResponse) => {
					if (response) {
						setAuthorIdList([...authorIdList, response.result.id]);
					}
				})
				// eslint-disable-next-line
				.catch((error: any) => {
					// eslint-disable-next-line
					console.error(error.response.data.message);
				});
		}
	};

	const getDurationInHours = (duration: number): string => {
		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;
		return `${hours}:${minutes.toString().padStart(2, '0')} hours`;
	};

	const onChangeDuration = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		setDuration(parseInt(event.target.value));
	};

	const getDateNow = (): string => {
		const date = new Date();
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${month}/${day}/${year}`;
	};

	const onClickAddAuthorToCourse = (authorName: string): void => {
		const author = authors.find((a) => a.name === authorName);
		if (author && !authorIdList.includes(author.id)) {
			setAuthorIdList([...authorIdList, author.id]);
		}
	};

	const getAuthorsName = (authorId: string[]): string[] => {
		const authorsName = authors
			.filter((author) => authorId.includes(author.id))
			.map((author) => author.name);
		return authorsName;
	};

	const validateForm = (): void => {
		if (
			!courseTitle.trim() ||
			authorList.length === 0 ||
			duration <= 0 ||
			!courseDescription.trim()
		) {
			alert(
				'Please fill in all the fields and make sure the duration is greater than 0'
			);
		} else {
			const course = {
				title: courseTitle,
				authors: authorIdList,
				duration,
				description: courseDescription,
				creationDate: getDateNow(),
				id: '',
			};

			if (token && !courseId) {
				dispatch(addCourseThunk(token, course));
			} else if (token && courseId) {
				dispatch(updateCourseThunk(token, courseId, course));
			}
			alert('Course saved successfully!');
			navigate('/');
		}
	};

	const deleteAuthorFromLayout = (authorId: string): void => {
		if (token) {
			dispatch(deleteAuthorThunk(token, authorId))
				.then(() => {
					const updatedAuthorIdList = authorIdList.filter(
						(id) => id !== authorId
					);
					setAuthorIdList(updatedAuthorIdList);
					const updatedAuthorList = authorList.filter(
						(authorName) =>
							authors.find((a) => a.id === authorId)?.name !== authorName
					);
					setAuthorList(updatedAuthorList);
				})
				// eslint-disable-next-line
				.catch((error: any) => {
					// eslint-disable-next-line
					console.error(error.response.data.message);
				});
		}
	};

	const getCourseInfo = useCallback(() => {
		return coursesRedux.find((course) => course.id === courseId);
	}, [courseId, coursesRedux]);

	const showAuthors = (): JSX.Element[] => {
		return authors.map((author) => {
			return (
				<div
					className='flex justify-between w-full gap-20 my-2'
					key={author.name}
				>
					<div key={author.name}>
						<h3>{author.name}</h3>
					</div>
					<div className='flex gap-2'>
						<Button
							buttonText='Add author'
							onClick={() => {
								if (!authorList.includes(author.name)) {
									setAuthorList([...authorList, author.name]);
									onClickAddAuthorToCourse(author.name);
								}
							}}
							className='bg-green-500 py-2 px-6 rounded-md text-white'
						/>
						<Button
							buttonText='Delete author'
							onClick={() => {
								deleteAuthorFromLayout(author.id);
							}}
							className='bg-red-500 py-2 px-6 rounded-md text-white'
						/>
					</div>
				</div>
			);
		});
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
		}
	}, []);

	useEffect(() => {
		if (courseId) {
			const courseToEdit = getCourseInfo();

			if (courseToEdit) {
				setCourseTitle(courseToEdit.title);
				setCourseDescription(courseToEdit.description);
				setDuration(courseToEdit.duration);
				setAuthorIdList(courseToEdit.authors.map((author) => author));
				setAuthorList(getAuthorsName(courseToEdit.authors));
			}
		}
	}, []);

	return (
		<>
			<section className='my-6 mx-8'>
				<div className='flex flex-col'>
					<div className='flex justify-between'>
						<div className='flex flex-col'>
							<Input
								id='addCourseTitle'
								type='text'
								label='Title'
								placeHolder='Enter title...'
								className='border-solid border border-gray-400 w-72 p-2 text-sm my-2 rounded-md'
								minLength={2}
								value={courseTitle}
								onChange={(event) => {
									setCourseTitle(event.target.value);
								}}
							/>
						</div>
						<div className='flex justify-center items-center'>
							<Button
								buttonText='Create course'
								onClick={() => {
									validateForm();
								}}
								className='bg-green-500 py-2 px-6 rounded-md text-white'
							/>
						</div>
					</div>
					<TextArea
						className='border-solid border border-gray-400 w-full h-24 p-2 text-sm mt-2 rounded-md'
						id='addCourseDescription'
						label='Description'
						placeHolder='Enter description...'
						minLegth={2}
						onchange={(event) => {
							setCourseDescription(event.target.value);
						}}
						value={courseDescription}
					/>
				</div>
			</section>
			<section className='my-6 mx-8'>
				<div className='flex justify-between w-full'>
					<div className='flex flex-col items-center justify-around'>
						<div className='flex flex-col '>
							<Input
								id='CreateCourseAuthor'
								type='text'
								label='Author name'
								placeHolder='Enter author name...'
								className='border border-solid border-gray-400 w-96 p-2 text-sm my-2 rounded-md'
								minLength={2}
								onChange={(event) => {
									setNewAuthorName(event.target.value);
								}}
							/>
							<Button
								buttonText='Create author'
								onClick={() => {
									onClickAddAuthor();
								}}
								className='border border-solid p-2 bg-cyan-500 w-32 text-white rounded-md'
							/>
						</div>
						<div className='flex flex-col mt-6'>
							<Input
								type='number'
								id='CreateCourseDuration'
								className='border border-solid border-gray-400 w-96 p-2 text-sm my-2 rounded-md'
								label='Duration'
								placeHolder='Enter duration in minutes...'
								onChange={onChangeDuration}
								value={duration.toString()}
							/>
							<h4>
								Duration:{' '}
								<span className='font-bold'>
									{getDurationInHours(duration)}
								</span>
							</h4>
						</div>
					</div>
					<div className='flex flex-col items-start'>
						<h4 className='text-center w-full mb-6 font-bold'>Authors</h4>
						{showAuthors()}
						<h4 className='w-full text-center mt-6 font-bold'>
							{' '}
							Course author
						</h4>
						{authorList.length > 0 ? (
							<>
								{authorList.map((author, index) => {
									return <h4 key={index}>{author}</h4>;
								})}
								{authorList.length > 0 && (
									<Button
										buttonText='Delete last'
										className='bg-red-500 text-white p-2 rounded-md'
										onClick={() => {
											const updatedAuthorList = [...authorList];
											updatedAuthorList.pop();
											setAuthorList(updatedAuthorList);
										}}
									/>
								)}
							</>
						) : (
							<h4 className='w-full text-center mt-4'>Author list is empty</h4>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default CourseForm;
