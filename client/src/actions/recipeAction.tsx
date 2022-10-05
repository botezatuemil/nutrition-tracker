import { AxiosError, AxiosPromise } from "axios";
import * as api from "../api/routes";
import { Meal, NutrientsRef, RecipeShow } from "../interfaces";
import { addRecipeStore, getRecipes, deleteRecipeById } from "../store/recipe";
import {addRecipeToMeal} from '../store/meal';

export const addRecipe =
  (nutrients: NutrientsRef, meal: Meal, headers: Object) =>
  async (dispatch: any) => {
    try {
      const recipeId = await api.addRecipe(nutrients, meal, headers);

      const recipe: RecipeShow = {
        id: recipeId.data.id,
        name: meal.name,
        amount: meal.amount,
        calories: nutrients.calories,
        carbs: nutrients.carbs,
        fat :nutrients.fat,
        protein: nutrients.protein,
        sugar: nutrients.sugar
      };

      console.log(recipe);

      dispatch(addRecipeStore(recipe));
    } catch (error) {
      console.log(error);
    }
  };

export const getAllRecipes = (headers: any) => async (dispatch: any) => {
  try {

    const recipes = await api.getAllRecipes(headers);
    dispatch(getRecipes(recipes.data));
  } catch (error) {
    console.log(error)
  }
};


export const addMealTypeToRecipe  = (index: number, value: RecipeShow, headers: any) => async (dispatch: any) => {
  try {
    const recipe = await api.addMealTypeToRecipe(index, value.id, headers);
    
    dispatch(addRecipeToMeal({index, recipe}));
  } catch (error) {
    console.log(error);
  }
}

export const deleteRecipe = (id: number, headers: any) => async (dispatch: any) => {
  try {
    const recipe = await api.deleteRecipe(id, headers);
    dispatch(deleteRecipeById(id));
  } catch (error) {
    console.log(error);
  }
}

export const addMealToRecipe = (meals : string[], headers: any) => async (dispatch: any) => {
  try {
    const recipe = await api.addMealToRecipe(meals, headers);
    //dispatch(saveMealToRecipe);
  } catch (error) {
    console.log(error);
  }
}