import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../src/features/counter/counterSlice';
import ayahsReducer from './features/ayahs/ayahsSlice';

export const store = configureStore({
  reducer: {
    ayahs:ayahsReducer
  },
});