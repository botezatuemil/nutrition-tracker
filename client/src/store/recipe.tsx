import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AllMeals, Nutrients, RecipeShow, Type } from "../interfaces/index";

const initialState: RecipeShow[] = [];

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipeStore: (state, action: any) => {
        return [...state, action.payload];
    },
    getRecipes : (state, action : any) => {
      return [...action.payload];
    },
    deleteRecipeById : (state, action: any) => {
      return state.filter(value => value.id !== action.payload);
    }
  },
});

export const { addRecipeStore, getRecipes, deleteRecipeById } = recipeSlice.actions;
export default recipeSlice.reducer;
