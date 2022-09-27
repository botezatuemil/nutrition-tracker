import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import { Profile, User, Nutrients, DateTime, MealType, Meal, NutrientsRef } from "../interfaces/index";
const url = "http://localhost:5000";

export const registerUser = (user: User) => axios.post(`${url}/register`, user);
export const loginUser = (user: User) => axios.post(`${url}/login`, user);
export const createProfile = (profile: Profile, nutrients: Nutrients, headers: any) => axios.post(`${url}/calculateMacros`, { objects: [profile, nutrients] },{ headers });
export const getMacros  = (headers: any) => axios.get(`${url}/getMacros`, { headers });
export const addJournal = (mealType: MealType, date: DateTime, headers: any,) => axios.post(`${url}/addJournal`,  {objects: [date, mealType]}, {headers});
export const getMealTypes = (date: DateTime, headers: any) => axios.post(`${url}/getMealTypes`, date, {headers});
export const addMealJournal = (meal: Meal, nutrients: NutrientsRef, headers: any) => axios.post(`${url}/addMeal`, {objects: [meal, nutrients]}, {headers});
export const deleteMeal = (checkedMeals: string[], headers: any) => axios.post(`${url}/deleteMeal`, checkedMeals, {headers});
export const deleteMealbyId = (mealType: number, headers: any) => axios.post(`${url}/deleteMealType`, {id: mealType}, {headers});
export const addRecipe = (nutrients: NutrientsRef, meal: Meal, headers: any) => axios.post(`${url}/addRecipe`, {objects: [nutrients, meal]}, {headers});
export const getAllRecipes = (headers: any) => axios.get(`${url}/getAllRecipes`, {headers});
export const addMealTypeToRecipe = (index: number, id: number, headers: any) => axios.post(`${url}/addMealTypeToRecipe`, {objects: [index, id]}, {headers});
export const deleteRecipe = (id: number, headers: any) => axios.post(`${url}/deleteRecipe`, {id}, {headers});
export const fetchChartData = (startDate: Date, endDate: Date, headers: any) => axios.post(`${url}/fetchChartData`, {startDate, endDate}, {headers})
export const editWaterGoal = (liters: number, headers: any) => axios.post(`${url}/editWaterGoal`, {liters}, {headers});
export const addWater = (liters: number, date: Date, headers: any) => axios.post(`${url}/addWater`, {liters, date}, {headers});
export const fetchWaterData = (startDate: Date, endDate: Date, headers: any) => axios.post(`${url}/fetchWaterData`, {startDate, endDate}, {headers})