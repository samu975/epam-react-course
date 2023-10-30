import { CoursesActionTypes, CourseType } from './types';

export const addNewCourseAction = (courseData: CourseType) => ({
  type: CoursesActionTypes.ADD_COURSE,
  payload: courseData,
});

export const getCourseAction = (courses: CourseType[]) => ({
  type: CoursesActionTypes.GET_COURSES,
  payload: courses,
});

export const deleteCourseAction = (id: string) => ({
  type: CoursesActionTypes.DELETE_COURSE,
  payload: id,
});

export const updateCourseAction = (courseData: CourseType) => ({
  type: CoursesActionTypes.UPDATE_COURSE,
  payload: courseData,
});
