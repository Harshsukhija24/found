import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentSlice";

const store = configureStore({
  reducer: {
    content: contentReducer,
    // Other reducers can be added here
  },
});

export default store;
