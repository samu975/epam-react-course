import { RootState } from '../store/rootReducer';
import { createSelector } from 'reselect';

export const selectAuthors = (state: RootState) => state.authors;
export const selectCourses = (state: RootState) => state.courses;
export const getUser = (state: RootState) => state.user;

export const getAuthors = createSelector([selectAuthors], (authors) => authors);

export const getCourses = createSelector([selectCourses], (courses) => courses);
