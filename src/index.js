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
import UpdateCourse from './pages/UpdateCourse';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PrivateRouteAdmin from './components/PrivateRoute/PrivateRouteAdmin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<App />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />

					<Route
						path='/courses/add'
						element={
							<PrivateRouteAdmin>
								<AddNewCourse />
							</PrivateRouteAdmin>
						}
					/>
					<Route
						path='/courses'
						element={
							<PrivateRoute>
								<Courses />
							</PrivateRoute>
						}
					/>

					<Route
						path='/courses/:courseId'
						element={
							<PrivateRoute>
								<CourseInfo />
							</PrivateRoute>
						}
					/>

					<Route
						path='courses/update/:courseId'
						element={
							<PrivateRouteAdmin>
								<UpdateCourse />
							</PrivateRouteAdmin>
						}
					/>
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	</Provider>
);
