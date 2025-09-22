import { createSlice } from "@reduxjs/toolkit";

const themesSlice = createSlice({
  name: "themes",
  initialState: {
    theme: "light",
  },
  reducers: {
    setTheme: (state, action) => {
      console.log("Setting theme to:", action.payload);
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themesSlice.actions;
export default themesSlice.reducer;
