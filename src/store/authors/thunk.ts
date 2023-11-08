import { Dispatch } from '@reduxjs/toolkit';
import { addAuthor, deleteAuthor, getAuthors } from '../../services';
import { AuthorType } from './types';

export const getAuthorsTunk = () => {
	return async (dispatch: Dispatch) => {
		const authors = await getAuthors();
		dispatch({ type: 'GET_AUTHORS', payload: authors });
	};
};

export const addAuthorThunk = (token: string, newAuthor: AuthorType) => {
	return async (dispatch: Dispatch) => {
		const authors = await addAuthor(token, newAuthor);
		dispatch({ type: 'ADD_AUTHOR', payload: authors });
	};
};

export const deleteAuthorThunk = (token: string, authorId: string) => {
	return async (dispatch: Dispatch) => {
		await deleteAuthor(token, authorId);
		dispatch({ type: 'DELETE_AUTHOR', payload: authorId });
	};
};
