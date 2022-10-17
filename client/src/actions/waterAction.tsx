import { AxiosError, AxiosPromise } from "axios";
import * as api from "../api/routes";
import {
  User,
  Profile,
  Nutrients,
  DateTime,
  MealType,
  Meal,
  NutrientsRef,
  AllMeals,
  ChartComponent,
  ChartData,
  LineChart,
} from "../interfaces";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAll,
  updateMeals,
  deleteMeals,
  deleteMealType,
} from "../store/meal";
import {  getGoal } from "../store/waterGoal";
import { getDrinkedWater } from "../store/drinkedWater";

export const editWaterGoal = (liters: number, headers: Object) => async (dispatch: any) => {
    try {
      await api.editWaterGoal(liters, headers);
      dispatch(getGoal(liters));
    } catch (error) {
      console.log(error);
    }
  };

  export const addWater = (liters: number, date: Date, headers: Object) => async (dispatch: any) => {
    try {
      const waterDrinked = await api.addWater(liters,date, headers);
      dispatch(getDrinkedWater(waterDrinked.data.newAmount));
    } catch (error) {
      console.log(error);
    }
  };

  export const fetchWaterData = async(startDate: Date, endDate: Date, headers: any)  => {
    try {
      const waterData : LineChart[] = (await api.fetchWaterData(startDate, endDate, headers)).data;
      return waterData;
    } catch (error) {
      console.log(error);
    }
  }

  export const getWaterGoal = (headers : any) => async(dispatch : any) => {
    try {
      const goal: number = (await api.getWaterGoal(headers)).data.liters;
      dispatch(getGoal(goal));
    } catch (error) {
     console.log(error) 
    }
  }

  export const getWater = (headers : any) => async(dispatch : any) => {
    try {
      const water: number = (await api.getWater(headers)).data.amount;
      dispatch(getDrinkedWater(water));
    } catch (error) {
      console.log(error);
    }
  }
