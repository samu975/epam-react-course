import { AddNewAuthorAction, AuthorsActionTypes, AuthorType } from './types';

export const addNewAuthorAction = (
	authorData: AuthorType
): AddNewAuthorAction => ({
	type: AuthorsActionTypes.ADD_AUTHOR,
	payload: authorData,
});
