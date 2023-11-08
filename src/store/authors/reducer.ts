import { AuthorsActionTypes, AuthorType, AuthorsActions } from './types';

export const initAuthorsState: AuthorType[] = [];

export const authorsReducer = (
	state = initAuthorsState,
	action: AuthorsActions
): AuthorType[] => {
	switch (action.type) {
		case AuthorsActionTypes.ADD_AUTHOR:
			return [...state, action.payload];
		case AuthorsActionTypes.GET_AUTHORS:
			return action.payload;
		case AuthorsActionTypes.DELETE_AUTHOR:
			return state.filter((author) => author.id !== action.payload);
		default:
			return state;
	}
};
