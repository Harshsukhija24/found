import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedContentIndex: 0,
  contents: [
    "open to work",
    "ready to work",
    "open to offer",
    "closed to offer",
  ],
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setSelectedContentIndex(state, action) {
      state.selectedContentIndex = action.payload;
    },
  },
});

export const { setSelectedContentIndex } = contentSlice.actions;
export default contentSlice.reducer;
