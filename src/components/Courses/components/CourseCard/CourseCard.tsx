import React from 'react';
import Button from '../../../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { CourseCardInterface } from '../../../../interfaces/index.interface';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store/rootReducer';
import { deleteCourseThunk } from '../../../../store/courses/thunk';

const CourseCard = ({
	title,
	description,
	authors,
	duration,
	createdAt,
	id,
}: CourseCardInterface): JSX.Element => {
	const navigate = useNavigate();
	//eslint-disable-next-line
	const dispatch = useDispatch<any>();
	const token = localStorage.getItem('token') || '';

	const authorsInRedux = useSelector((state: RootState) => state.authors);

	const getAuthorNames = (authorId: string[]): string => {
		const authorsName = authorsInRedux
			.filter((author) => authorId.includes(author.id))
			.map((author) => author.name);
		return authorsName.join(', ');
	};

	const onclickDeleteCourse = (): void => {
		const confirmDelete = confirm(
			'Are you sure you want to delete this course?'
		);
		if (confirmDelete) {
			dispatch(deleteCourseThunk(token, id));
		}
	};

	const user = useSelector((state: RootState) => state.user);

	return (
		<>
			<section className='courses p-4 flex border border-solid border-blue-300 mx-4 borer my-6 rounded-lg justify-between flex-wrap'>
				<div className='flex flex-col min-w-[800px]'>
					<h2 className='font-bold text-2xl my-4 ml-4'>{title}</h2>
					<p className='px-4 w-10/12'>{description}</p>
				</div>
				<div className='flex flex-2 flex-col justify-center px-4 items-center max-w-[220px]'>
					<div className='my-4'>
						<p>
							<strong>Authors: </strong>
							{getAuthorNames(authors)}
						</p>
						<p>
							<strong>Duration: </strong>
							{duration}
						</p>
						<p>
							<strong>Created at: </strong>
							{createdAt}
						</p>
					</div>
					<div className='flex items-center gap-2'>
						<Button
							buttonText='Show course'
							onClick={() => {
								navigate(`${id}`);
							}}
							className='bg-cyan-500 text-white p-2 rounded-md'
						/>
						{user.role === 'admin' && (
							<>
								<div
									className='cursor-pointer'
									onClick={() => {
										navigate(`/courses/update/${id}`);
									}}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.5}
										stroke='currentColor'
										className='w-6 h-6'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
										/>
									</svg>
								</div>
								<div
									className='cursor-pointer'
									onClick={() => {
										onclickDeleteCourse();
									}}
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth='1.5'
										stroke='currentColor'
										className='w-6 h-6'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
										/>
									</svg>
								</div>
							</>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default CourseCard;
