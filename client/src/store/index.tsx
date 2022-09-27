import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import meal from './meal';
import mealTotal from './mealTotal';
import wasAddedMeal from "./wasAddedMeal";
import checkedMeals from "./checkedMeals";
import recipes from "./recipe";
import water from "./waterGoal";
import drinkedWater from "./drinkedWater";

const store = configureStore({
  reducer: {
    user,
    meal,
    mealTotal,
    wasAddedMeal,
    checkedMeals,
    recipes,
    water,
    drinkedWater
}})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
