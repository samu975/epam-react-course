export type AuthorType = {
  name: string;
  id: string;
};

export enum AuthorsActionTypes {
  ADD_AUTHOR = 'ADD_AUTHOR',
  GET_AUTHORS = 'GET_AUTHORS',
}

export type AddNewAuthorAction = {
  type: AuthorsActionTypes.ADD_AUTHOR;
  payload: AuthorType;
};

export type GetAuthorsAction = {
  type: AuthorsActionTypes.GET_AUTHORS;
  payload: AuthorType[];
};

export type AuthorsActions = AddNewAuthorAction | GetAuthorsAction;
