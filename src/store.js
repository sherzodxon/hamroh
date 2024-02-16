import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../src/features/counter/counterSlice';
import ayahsReducer from './features/ayahs/ayahsSlice';
import audioSlice from './features/ayahs/audioSlice';

export const store = configureStore({
  reducer: {
    ayahs:ayahsReducer,
    audio:audioSlice
  },
});