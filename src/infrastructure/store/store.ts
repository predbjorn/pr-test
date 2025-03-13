import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { rootReducer, middleware } from '../../store/configureStore';
import lifeContextReducer from './slices/lifeContextSlice';
import menstruationReducer from './slices/menstruationSlice';
import pregnancyReducer from './slices/pregnancySlice';

export const store = configureStore({
  reducer: {
    ...rootReducer,
    lifeContext: lifeContextReducer,
    menstruation: menstruationReducer,
    pregnancy: pregnancyReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }).concat(middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export a hook that can be reused to resolve types
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
