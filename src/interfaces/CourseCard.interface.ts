interface Author {
	id: string;
	name: string;
}

export interface CourseCardInterface {
	id: string;
	title: string;
	description: string;
	authors: Author[];
	duration: number;
	createdAt: string;
}
