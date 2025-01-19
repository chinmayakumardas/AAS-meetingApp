// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/AuthSlice';
import toogleReducer from '@/redux/ToogleSlice';
import noteReducer from '@/redux/NotesSlice';
import meetingReducer from '@/redux/MeetingSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    toggle: toogleReducer,
    note: noteReducer,
    meeting: meetingReducer,
  },
});
