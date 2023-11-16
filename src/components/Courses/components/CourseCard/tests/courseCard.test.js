/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import CourseCard from '../CourseCard';
import configureStore from 'redux-mock-store';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => jest.fn(),
}));

const mockStore = configureStore([]);
const store = mockStore({
	authors: [
		{ id: '123', name: 'Author Name' },
		{ id: '456', name: 'Author Name 2' },
	],
});

const mockProps = {
	title: 'Curso de prueba',
	description: 'Descripción del curso',
	authors: ['123', '456'],
	duration: '120',
	createdAt: '2023-11-15',
	id: '123456789',
	deleteCourseFn: jest.fn(),
};

describe('CourseCard Component', () => {
	test('CourseCard should display title', () => {
		render(
			<Provider store={store}>
				<Router>
					<CourseCard {...mockProps} />
				</Router>
			</Provider>
		);

		expect(screen.getByText('Curso de prueba')).toBeInTheDocument();
	});

	test('CourseCard should display description', () => {
		render(
			<Provider store={store}>
				<Router>
					<CourseCard {...mockProps} />
				</Router>
			</Provider>
		);

		expect(screen.getByText('Descripción del curso')).toBeInTheDocument();
	});

	test('CourseCard should display duration in the correct format', () => {
		render(
			<Provider store={store}>
				<Router>
					<CourseCard {...mockProps} />
				</Router>
			</Provider>
		);

		expect(screen.getByText('120')).toBeInTheDocument();
	});

	test('CourseCard should display authors list', () => {
		render(
			<Provider store={store}>
				<Router>
					<CourseCard {...mockProps} />
				</Router>
			</Provider>
		);

		expect(screen.getByText('Author Name, Author Name 2')).toBeInTheDocument();
	});

	test('CourseCard should display created date in the correct format', () => {
		render(
			<Provider store={store}>
				<Router>
					<CourseCard {...mockProps} />
				</Router>
			</Provider>
		);

		expect(screen.getByText('2023-11-15')).toBeInTheDocument();
	});
});
