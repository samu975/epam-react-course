export interface CourseCardInterface {
	id: string;
	title: string;
	description: string;
	authors: string[];
	duration: number;
	createdAt: string;
	deleteCourseFn: (id: string) => void;
}
