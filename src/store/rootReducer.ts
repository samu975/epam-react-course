import { combineReducers } from "@reduxjs/toolkit";
import { coursesReducer } from "./courses/reducer";
import { authorsReducer } from "./authors/reducer";
import { userReducer } from "./user/reducer";
import { CourseType } from "./courses/types";
import { AuthorType } from "./authors/types";
import { UserType } from "./user/types";

export interface RootState {
  courses: CourseType[];
  authors: AuthorType[];
  user: UserType;
}

const rootReducer = combineReducers({
  courses: coursesReducer,
  authors: authorsReducer,
  user: userReducer,
});

export default rootReducer;
