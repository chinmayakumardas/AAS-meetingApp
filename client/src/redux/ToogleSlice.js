// src/redux/toggleSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isGridView: true, // Default value for the view
};

const toogleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    toggleGridView: (state) => {
      state.isGridView = !state.isGridView;
    },
  },
});

export const { toggleGridView } = toogleSlice.actions;
export default toogleSlice.reducer;
