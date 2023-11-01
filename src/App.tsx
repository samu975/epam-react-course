import React from 'react';
import Header from './components/Header/Header';
import './App.css';
import Courses from './components/Courses/Courses';

function App(): JSX.Element {
	return (
		<>
			<Header />
			<Courses />
		</>
	);
}

export default App;
