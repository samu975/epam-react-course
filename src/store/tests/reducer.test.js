/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-undef */
import { coursesReducer, initCoursesState } from '../courses/reducer';
import { CoursesActionTypes } from '../courses/types';

describe('coursesReducer', () => {
	test('reducer should return the initial state', () => {
		expect(coursesReducer(undefined, { type: null })).toEqual(initCoursesState);
	});

	test('reducer should handle SAVE_COURSE and returns new state', () => {
		const newCourse = {
			id: '1',
			title: 'New Course',
			description: 'Course Description',
			creationDate: '2021-01-01',
			duration: 120,
			authors: ['author1', 'author2'],
		};

		const newState = coursesReducer(initCoursesState, {
			type: CoursesActionTypes.ADD_COURSE,
			payload: newCourse,
		});

		expect(newState).toEqual([newCourse]);
	});
});
