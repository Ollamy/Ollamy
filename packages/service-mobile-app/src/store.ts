import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';

import authSlice from 'src/features/auth/authSlice';
import { api } from 'src/services/api';

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
	configureStore({
		reducer: {
			[api.reducerPath]: api.reducer,
			auth: authSlice,
		},
		...options,
	});

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
