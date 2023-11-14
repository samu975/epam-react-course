import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddNewCourse from './pages/AddNewCourse';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />} />
					<Route path='/courses/add' element={<AddNewCourse />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
					<Route path='/courses' element={<Courses />} />
					<Route path='/courses/:courseId' element={<CourseInfo />} />
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	</Provider>
);
