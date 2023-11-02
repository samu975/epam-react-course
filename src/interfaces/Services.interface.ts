import { AuthorInfoInterface } from './AuthorInfo';
import { CourseInfoInterface } from './CourseInfo.interface';

export interface LoginResponseInterface {
	successful: boolean;
	result: string;
	user: {
		email: string;
		name: string;
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
