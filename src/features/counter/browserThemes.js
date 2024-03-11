import { createSlice } from '@reduxjs/toolkit';

const browserThemesSlice = createSlice({
  name: 'themes', 
  initialState: {
    containerClassName:"night-container",
    tablet:false,
    mobile:false
  },
  reducers: {
    editClassname: (state,{payload}) => {
      state.containerClassName=payload;
    },
    editTablet:(state,{payload})=>{
      state.tablet=payload
    },
    editMobile:(state,{payload})=>{
      state.mobile=payload
    }
    
  },
});

export const {editClassname,editTablet,editMobile} =browserThemesSlice.actions;
export default browserThemesSlice.reducer;
 