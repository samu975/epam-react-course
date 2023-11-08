import axios from 'axios';
import {
	AddNewCourseResponse,
	DeleteCourseResponse,
	GetAuthrosResponse,
	GetCoursesResponse,
	GetOwnInfoResponse,
	LogoutResponse,
	LoginResponseInterface,
	RegisterResponseInterface,
	AddNewAuthorResponse,
	UpdateCourseResponse,
} from './interfaces/Services.interface';
import { CourseType } from './store/courses/types';
import { AuthorType } from './store/authors/types';

// --------------------- profile ---------------------

export const login = async (
	email: string,
	password: string
): Promise<LoginResponseInterface> => {
	const response = await axios.post('http://localhost:4000/login', {
		email,
		password,
	});
	return response.data;
};

export const register = async (
	name: string,
	email: string,
	password: string
): Promise<RegisterResponseInterface> => {
	const response = await axios.post('http://localhost:4000/register', {
		name: name,
		email: email,
		password: password,
	});
	return response.data;
};

export const logout = async (token: string): Promise<LogoutResponse> => {
	const response = await axios.delete(`http://localhost:4000/logout`, {
		headers: {
			Authorization: `${token}`,
		},
	});
	return response.data;
};

export const getOwnInfo = async (
	token: string
): Promise<GetOwnInfoResponse> => {
	const response = await axios.get(`http://localhost:4000/users/me`, {
		headers: {
			Authorization: `${token}`,
		},
	});
	return response.data.result;
};

// --------------------- courses ---------------------

export const getCourses = async (): Promise<GetCoursesResponse> => {
	const response = await axios.get(`http://localhost:4000/courses/all`);
	return response.data.result;
};

export const addCourse = async (
	token: string,
	course: CourseType
): Promise<AddNewCourseResponse> => {
	const response = await axios.post(
		`http://localhost:4000/courses/add`,
		{
			title: course.title,
			description: course.description,
			duration: course.duration,
			authors: course.authors,
		},
		{
			headers: {
				Authorization: `${token}`,
			},
		}
	);
	return response.data.result;
};

export const updateCourse = async (
	token: string,
	courseId: string,
	course: CourseType
): Promise<UpdateCourseResponse> => {
	const response = await axios.put(
		`http://localhost:4000/courses/${courseId}`,
		{
			title: course.title,
			description: course.description,
			duration: course.duration,
			authors: course.authors,
		},
		{
			headers: {
				Authorization: `${token}`,
			},
		}
	);
	return response.data.result;
};

export const deleteCourse = async (
	token: string,
	courseId: string
): Promise<DeleteCourseResponse> => {
	const response = await axios.delete(
		`http://localhost:4000/courses/${courseId}`,
		{
			headers: {
				Authorization: `${token}`,
			},
		}
	);
	return response.data.result;
};

// --------------------- author ---------------------

export const getAuthors = async (): Promise<GetAuthrosResponse> => {
	const response = await axios.get(`http://localhost:4000/authors/all`);
	return response.data;
};

export const addAuthor = async (
	token: string,
	author: AuthorType
): Promise<AddNewAuthorResponse> => {
	const response = await axios.post(
		'http://localhost:4000/authors/add',
		{
			name: author.name,
		},
		{
			headers: {
				Authorization: `${token}`,
			},
		}
	);
	return response.data.result;
};

export const deleteAuthor = async (
	token: string,
	authorId: string
): Promise<DeleteCourseResponse> => {
	const response = await axios.delete(
		`http://localhost:4000/authors/${authorId}`,
		{
			headers: {
				Authorization: `${token}`,
			},
		}
	);
	return response.data;
};
