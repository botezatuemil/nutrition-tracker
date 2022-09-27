import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AllMeals, Nutrients, Type } from "../interfaces/index";

const initialState: AllMeals[] = [];

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    fetchAll: (state, action: any) => {
      //Object.assign(state, action.payload.data);
      if (action.payload.data.length === 0) {
        return [];
      }

      return [...action.payload.data];
    },

    update: (state, action: any) => {
      console.log(action.payload.data);
      return [...state, action.payload.data];
    },

    updateMeals: (state, action: any) => {
      const result: AllMeals[] = state.map((value) =>
        value.id === action.payload.data[0].id
          ? {
              ...value,
              nutrients:
                value.nutrients != null && value.nutrients !== ""
                  ? value.nutrients + ":" + action.payload.data[0].nutrients
                  : action.payload.data[0].nutrients,
              meal:
                value.meal != null && value.meal !== ""
                  ? value.meal + ":" + action.payload.data[0].meal
                  : action.payload.data[0].meal,
            }
          : value
      );

      return [...result];
    },

    deleteMeals: (state, action: any) => {
      const splitted = action.payload.split(/[(,)]/);

      let mealAfterDeleting: string = "";

      const splittedState = state.map((value) => {
        if (value.id === parseInt(splitted[5])) {
          const splittedMeals = value.meal.split(":");
          const meals = splittedMeals.filter(
            (valueMeal) => valueMeal.split(/[(,)]/)[1] !== splitted[1]
          );

          mealAfterDeleting = meals.join(":");
          return 0;
        }
      });

      let nutrientsAfterDeleting: string = "";
      const nutrientsState = state.map((value) => {
        if (value.id === parseInt(splitted[5])) {
          const splittedNutrients = value.nutrients.split(":");
          const nutrients = splittedNutrients.filter(
            (nutrient) => nutrient.split(/[(,)]/)[1] !== splitted[3]
          );

          nutrientsAfterDeleting = nutrients.join(":");
          console.log(nutrientsAfterDeleting);
          return 0;
        }
      });

      const newMeals = state.map((value) =>
        value.id === parseInt(splitted[5])
          ? {
              ...value,
              meal: mealAfterDeleting,
              nutrients: nutrientsAfterDeleting,
            }
          : value
      );
      return newMeals;
    },
    deleteMealType: (state, action: any) => {
      const newState = state.filter((value) => value.id !== action.payload);
      return [...newState];
    },
    addRecipeToMeal: (state, action: any) => {
      console.log(action.payload.recipe.meal);
      
      const result: AllMeals[] = state.map((value) =>
        value.id === action.payload.index
          ? {
              ...value,
              nutrients:
                value.nutrients != null && value.nutrients !== ""
                  ? value.nutrients + ":" + action.payload.recipe.data.nutrients
                  : action.payload.recipe.data.nutrients,
              meal:
                value.meal != null && value.meal !== ""
                  ? value.meal + ":" + action.payload.recipe.data.meal
                  : action.payload.recipe.data.meal,
            }
          : value
      );
      console.log(result);
      return [...result];
    },
  },
});

export const {
  fetchAll,
  update,
  updateMeals,
  deleteMeals,
  deleteMealType,
  addRecipeToMeal,
} = mealsSlice.actions;
export default mealsSlice.reducer;
