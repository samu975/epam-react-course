import { AuthorInfoInterface } from './AuthorInfo';
import { CourseInfoInterface } from './CourseInfo.interface';

export interface LoginResponseInterface {
	successful: boolean;
	result: string;
	user: {
		email: string;
		name: string;
		role: string;
	};
}

export interface RegisterResponseInterface {
	successful: boolean;
	result: string;
}

export interface GetCoursesResponse {
	succesful: boolean;
	result: CourseInfoInterface[];
}

export interface GetAuthrosResponse {
	succesful: boolean;
	result: AuthorInfoInterface[];
}

export interface DeleteCourseResponse {
	succesful: boolean;
	result: string;
}

export interface GetOwnInfoResponse {
	succesful: boolean;
	result: {
		email: string;
		name: string;
	};
}

export interface AddNewCourseResponse {
	succesful: boolean;
	result: string;
}

export interface LogoutResponse {
	succesful: boolean;
	result: string;
}

export interface AddNewAuthorResponse {
	succesful: boolean;
	result: {
		name: string;
		id: string;
	};
}

export interface UpdateCourseResponse {
	succesful: boolean;
	result: string;
}

export interface DeleteAuthorResponse {
	succesful: boolean;
	result: string;
}
