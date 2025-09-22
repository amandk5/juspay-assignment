import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./ordersSlice";
import themesReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    themes: themesReducer,
  },
});
