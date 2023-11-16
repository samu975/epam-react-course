/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../Header';
import { BrowserRouter as Router } from 'react-router-dom';

const localStorageMock = function () {
	let store = {};
	return {
		getItem(key) {
			return store[key] || null;
		},
		setItem(key, value) {
			store[key] = value.toString();
		},
		removeItem(key) {
			delete store[key];
		},
		clear() {
			store = {};
		},
	};
};

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock(),
});

describe('Header Component', () => {
	beforeEach(() => {
		localStorage.clear();
	});

	test('should display the logo', () => {
		render(
			<Router>
				<Header />
			</Router>
		);

		const logo = screen.getByRole('img', { name: /logo/i });
		expect(logo).toBeInTheDocument();
	});

	test('should display the user name when the user is logged', () => {
		localStorage.setItem('name', 'Samuel Rosero');
		localStorage.setItem('token', '123456789');

		render(
			<Router>
				<Header />
			</Router>
		);

		const userName = screen.queryByText('Samuel Rosero');
		expect(userName).toBeInTheDocument();
	});
});
