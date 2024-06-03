import { createSlice } from "@reduxjs/toolkit";

// Initial state with a default selected index and an array of statuses
const initialState = {
  selectedActiveIndex: 0,
  active: ["actively hiring", "hiring for future", "mass hiring"],
};

const ActiveSlice = createSlice({
  name: "Active",
  initialState,
  reducers: {
    // Reducer to set the selected active index
    setSelectedActiveIndex(state, action) {
      state.selectedActiveIndex = action.payload;
    },
  },
});

// Exporting the action creator and the reducer
export const { setSelectedActiveIndex } = ActiveSlice.actions;
export default ActiveSlice.reducer;
