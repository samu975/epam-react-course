import {
	AddNewAuthorAction,
	AuthorsActionTypes,
	AuthorType,
	GetAuthorsAction,
} from './types';

export const addNewAuthorAction = (
	authorData: AuthorType
): AddNewAuthorAction => ({
	type: AuthorsActionTypes.ADD_AUTHOR,
	payload: authorData,
});

export const getAuthorsAction = (authors: AuthorType[]): GetAuthorsAction => ({
	type: AuthorsActionTypes.GET_AUTHORS,
	payload: authors,
});
