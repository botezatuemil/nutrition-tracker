import { createSlice } from "@reduxjs/toolkit";
import { AllMeals } from "../interfaces";

const initialState: AllMeals[] = [

];

export const lastProducts = createSlice({
  name: "lastProducts",
  initialState,
  reducers: {
    addToLastProducts : (state, action: any) => {
        let newState = [...state, action.payload.data];
        if (newState.length > 5) {
            newState.shift();
        }
        return newState;
    },
    fetch : (state, action: any) => {
      return [...action.payload];
    }
  },
});

export const { addToLastProducts, fetch } = lastProducts.actions;
export default lastProducts.reducer;