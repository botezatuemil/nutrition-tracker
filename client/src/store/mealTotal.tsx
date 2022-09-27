import { createSlice } from '@reduxjs/toolkit'
import {Nutrients} from '../interfaces/index';

const initialState : Nutrients = {
  calories: 0,
  carbs: 0,
  fat: 0,
  protein: 0,
  sugar: 0
}

export const mealTotalSlice = createSlice({
  name: 'total',
  initialState,
  reducers: {
    initialize :(state) => {
        state.calories = 0;
        state.carbs = 0;
        state.fat = 0;
        state.protein = 0;
        state.sugar = 0;
    },
    add : (state, action) => {
        state.calories += action.payload.calories;
        state.carbs += action.payload.carbs;
        state.fat += action.payload.fat;
        state.protein += action.payload.protein;
        state.sugar += action.payload.sugar;

        return state;
    },
    substract : (state, action) => {
      state.calories -= action.payload.calories;
      state.carbs -= action.payload.carbs;
      state.fat -= action.payload.fat;
      state.protein -= action.payload.protein;
      state.sugar -= action.payload.sugar;

      return state;
  }
  },
})

export const { initialize, add, substract } = mealTotalSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default mealTotalSlice.reducer