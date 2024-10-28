// store/slices/navigationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    currentPage: 0,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    incrementPage: (state, action) => {
      state.currentPage = Math.min(action.payload.maxPage, state.currentPage + 1);
    },
    decrementPage: (state) => {
      state.currentPage = Math.max(0, state.currentPage - 1);
    },
  },
});

export const { setCurrentPage, incrementPage, decrementPage } = navigationSlice.actions;
export default navigationSlice.reducer;
