export type CourseType = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
};

export enum CoursesActionTypes {
  ADD_COURSE = 'ADD_COURSE',
  DELETE_COURSE = 'DELETE_COURSE',
  UPDATE_COURSE = 'UPDATE_COURSE',
  GET_COURSES = 'GET_COURSES',
}

export type AddNewCourseAction = {
  type: CoursesActionTypes.ADD_COURSE;
  payload: CourseType;
};

export type DeleteCourseAction = {
  type: CoursesActionTypes.DELETE_COURSE;
  payload: string;
};

export type UpdateCourseAction = {
  type: CoursesActionTypes.UPDATE_COURSE;
  payload: CourseType;
};

export type GetCourseAction = {
  type: CoursesActionTypes.GET_COURSES;
  payload: CourseType[];
};

export type CoursesActions =
  | AddNewCourseAction
  | GetCourseAction
  | DeleteCourseAction
  | UpdateCourseAction;
