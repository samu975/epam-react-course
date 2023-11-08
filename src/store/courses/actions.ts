import {
	AddNewCourseAction,
	CoursesActionTypes,
	CourseType,
	DeleteCourseAction,
	UpdateCourseAction,
} from './types';

export const addNewCourseAction = (
	courseData: CourseType
): AddNewCourseAction => ({
	type: CoursesActionTypes.ADD_COURSE,
	payload: courseData,
});

export const deleteCourseAction = (id: string): DeleteCourseAction => ({
	type: CoursesActionTypes.DELETE_COURSE,
	payload: id,
});

export const updateCourseAction = (
	courseData: CourseType
): UpdateCourseAction => ({
	type: CoursesActionTypes.UPDATE_COURSE,
	payload: courseData,
});
