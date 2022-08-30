import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //upload
    uploadFileStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    uploadFileSuccess: (state, action) => {
      console.log(state.files = action.payload)
      console.log(action.payload)
      state.isFetching = false;
      state.files = action.payload
    },
    uploadFileFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearFile:(state)=>{
      console.log('clearFile')
      state.files=[]
    }
  },
});

export const { uploadFileStart, uploadFileSuccess, uploadFileFailure,clearFile } =
  fileSlice.actions;

export default fileSlice.reducer;
