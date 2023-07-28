import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false },
  reducers: {
    toggle(state) {
      stateCartIsVisible = !stateCartIsVisible;
    },
  },
});

export const uiActions = uiSlice.actions
export default uiSlice;