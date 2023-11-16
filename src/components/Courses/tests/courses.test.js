/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Courses from '../Courses';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedNavigate,
}));

const mockStore = configureStore([]);
const store = mockStore({
	authors: [
		{ id: '123', name: 'Author Name 1' },
		{ id: '456', name: 'Author Name 2' },
		{ id: '789', name: 'Author Name 3' },
		{ id: '153', name: 'Author Name 4' },
	],
	courses: [
		{
			id: '123456789',
			title: 'Curso 1',
			description: 'Descripción del curso 1',
			authors: ['123', '456'],
			duration: '120',
			createdAt: '2023-11-15',
		},
		{
			id: '234567891',
			title: 'Curso 2',
			description: 'Descripción del curso 2',
			authors: ['789', '153'],
			duration: '120',
			createdAt: '2023-11-15',
		},
	],
});

describe('Courses Component', () => {
	test('Courses should display amount of CourseCard equal length of courses array', () => {
		render(
			<Provider store={store}>
				<Router>
					<Courses />
					<Courses />
				</Router>
			</Provider>
		);

		const courseCards = screen.getAllByTestId('course-card');
		expect(courseCards.length).toBe(store.getState().courses.length);
	});

	test('CourseForm should be shown when add new course button is clicked', () => {
		render(
			<Provider store={store}>
				<Router>
					<Courses />
				</Router>
			</Provider>
		);

		const addButton = screen.getByText('Add new course');
		fireEvent.click(addButton);
		expect(mockedNavigate).toHaveBeenCalledWith('/courses/add');
	});
});
