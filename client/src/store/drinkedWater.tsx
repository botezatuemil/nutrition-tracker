import { createSlice } from "@reduxjs/toolkit";

const initialState: number = 0;

export const drinkedWater = createSlice({
  name: "drinkedWater",
  initialState,
  reducers: {
    getDrinkedWater : (state, action: any) => {
        return action.payload;
    }
  },
});

export const { getDrinkedWater } = drinkedWater.actions;
export default drinkedWater.reducer;