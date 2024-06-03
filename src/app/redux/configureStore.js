import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentSlice";
import activeReducer from "./ActiveSlice";
const store = configureStore({
  reducer: {
    content: contentReducer,
    active: activeReducer,
    // Other reducers can be added here
  },
});

export default store;
