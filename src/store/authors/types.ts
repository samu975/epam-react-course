export type AuthorType = {
	name: string;
	id: string;
};

export enum AuthorsActionTypes {
	ADD_AUTHOR = 'ADD_AUTHOR',
	GET_AUTHORS = 'GET_AUTHORS',
	DELETE_AUTHOR = 'DELETE_AUTHOR',
}

export type AddNewAuthorAction = {
	type: AuthorsActionTypes.ADD_AUTHOR;
	payload: AuthorType;
};

export type GetAuthorsAction = {
	type: AuthorsActionTypes.GET_AUTHORS;
	payload: AuthorType[];
};

export type DeleteAuthoR = {
	type: AuthorsActionTypes.DELETE_AUTHOR;
	payload: string;
};

export type AuthorsActions =
	| AddNewAuthorAction
	| GetAuthorsAction
	| DeleteAuthoR;
