import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './rootReducer';
import { initCoursesState } from './courses/reducer';
import { initAuthorsState } from './authors/reducer';
import { initUserState } from './user/reducer';

const appInitialState: RootState = {
	courses: initCoursesState,
	authors: initAuthorsState,
	user: initUserState,
};

const store: EnhancedStore<RootState> = configureStore({
	reducer: rootReducer,
	preloadedState: appInitialState,
});

export default store;
