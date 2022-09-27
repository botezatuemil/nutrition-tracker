import { createSlice } from "@reduxjs/toolkit";

const initialState: number = 0;

export const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    getGoal : (state, action: any) => {
        return action.payload;
    },
  },
});

export const { getGoal } = waterSlice.actions;
export default waterSlice.reducer;