import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: null,
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notification = action.payload;
    },
    removeNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export const selectNotification = (state) => state.notification;

export default notificationSlice.reducer;
