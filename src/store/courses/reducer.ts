import { CoursesActionTypes, CourseType, CoursesActions } from './types';

export const initCoursesState: CourseType[] = [];

export const coursesReducer = (
  state = initCoursesState,
  action: CoursesActions
): CourseType[] => {
  switch (action.type) {
    case CoursesActionTypes.GET_COURSES:
      return action.payload;
    case CoursesActionTypes.DELETE_COURSE:
      return state.filter((course) => course.id !== action.payload);
    case CoursesActionTypes.ADD_COURSE:
      return [...state, action.payload];
    case CoursesActionTypes.UPDATE_COURSE:
      return state.map((course) =>
        course.id === action.payload.id ? action.payload : course
      );
    default:
      return state;
  }
};
