import { Dispatch } from 'redux';
import {
	addCourse,
	deleteCourse,
	getCourses,
	updateCourse,
} from '../../services';
import { CourseType } from './types';

export const getCoursesThunk = () => {
	return async (dispatch: Dispatch) => {
		const courses = await getCourses();
		dispatch({
			type: 'GET_COURSES',
			payload: courses,
		});
	};
};

export const addCourseThunk = (token: string, course: CourseType) => {
	return async (dispatch: Dispatch) => {
		const newCourse = await addCourse(token, course);
		dispatch({
			type: 'ADD_COURSE',
			payload: newCourse,
		});
	};
};

export const updateCourseThunk = (
	token: string,
	courseId: string,
	course: CourseType
) => {
	return async (dispatch: Dispatch) => {
		const updatedCourse = await updateCourse(token, courseId, course);
		dispatch({
			type: 'UPDATE_COURSE',
			payload: updatedCourse,
		});
	};
};

export const deleteCourseThunk = (token: string, courseId: string) => {
	return async (dispatch: Dispatch) => {
		await deleteCourse(token, courseId);
		dispatch({
			type: 'DELETE_COURSE',
			payload: courseId,
		});
	};
};
