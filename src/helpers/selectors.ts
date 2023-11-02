import { AuthorType } from '../store/authors/types';
import { CourseType } from '../store/courses/types';
import { RootState } from '../store/rootReducer';
import { createSelector } from 'reselect';
import { UserType } from '../store/user/types';

export const selectAuthors = (state: RootState): AuthorType[] => state.authors;
export const selectCourses = (state: RootState): CourseType[] => state.courses;
export const getUser = (state: RootState): UserType => state.user;

export const getAuthors = createSelector([selectAuthors], (authors) => authors);

export const getCourses = createSelector([selectCourses], (courses) => courses);
