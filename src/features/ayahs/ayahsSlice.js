import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAyahs = createAsyncThunk('ayahs/Ayahs', async (id) => {

    const response = await axios.get(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`);
    const translatedRes = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/uzb-muhammadsodikmu/${id}.json`);
    const translatedData = await translatedRes.data.chapter
    return await response.data.data.ayahs.map((element) => ({
        id: element.number,
        numberInSurah:element.numberInSurah, 
        textArabic: element.text,
        textUzb: translatedData[element.numberInSurah - 1].text,
        audio:element.audio,
        isPlay:false,
        numberOfAyahs: response.data.data.numberOfAyahs
    }))
 
});

const ayahsSlice = createSlice({
  name: 'ayahs',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAyahs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAyahs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchAyahs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
  reducers:{
    playAyah:(state,id)=>{
        state.data.forEach(element => {
           if (element.id===id.payload) {
            element.isPlay=true
           }
           else{
            element.isPlay=false
           }
        });

    },
    pauseAyah:(state,id)=>{
      state.data.forEach(element=>{
       if (element.id===id.payload) {
        element.isPlay=false
       }
      })
    }
  }
});
export const{playAyah,pauseAyah}=ayahsSlice.actions
export default ayahsSlice.reducer;

