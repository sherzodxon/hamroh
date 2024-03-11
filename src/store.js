import { configureStore } from '@reduxjs/toolkit';
import ayahsReducer from './features/ayahs/ayahsSlice';
import audioSlice from './features/ayahs/audioSlice';
import browserThemes from './features/counter/browserThemes';

export const store = configureStore({
  reducer: {
    ayahs:ayahsReducer,
    audio:audioSlice,
    browserThemes:browserThemes,
  },
});