import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/root';
import logger from 'redux-logger';
import { useDispatch } from 'react-redux';

const middleware = [...getDefaultMiddleware(), logger];

export const store = configureStore({
	reducer: rootReducer,
	middleware,
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
