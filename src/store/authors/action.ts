import { AuthorsActionTypes, AuthorType } from "./types";

export const addNewAuthorAction = (authorData: AuthorType) => ({
  type: AuthorsActionTypes.ADD_AUTHOR,
  payload: authorData,
});

export const getAuthorsAction = (authors: AuthorType[]) => ({
  type: AuthorsActionTypes.GET_AUTHORS,
  payload: authors,
});
