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
  LineChart
} from "../interfaces";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAll,
  updateMeals,
  deleteMeals,
  deleteMealType,
} from "../store/meal";
import { addToLastProducts } from "../store/lastProducts";
import { fetch } from "../store/lastProducts";
export const getMealTypes =
  (date: DateTime, headers: Object) => async (dispatch: any) => {
    try {
      const meals = await api.getMealTypes(date, headers);

      dispatch(fetchAll(meals));
    } catch (error) {
      console.log(error);
    }
  };

export const addMealJournal =
  (meal: Meal, nutrients: NutrientsRef, headers: Object, addToLast : boolean) =>
  async (dispatch: any) => {
    try {
      const newMeal = await api.addMealJournal(meal, nutrients, headers);
      dispatch(updateMeals(newMeal));
      if (addToLast) {
        dispatch(addToLastProducts(newMeal));
      }
    } catch (error) {
      console.log(error);
    }
  };


export const deleteMeal =
  (checkedMeals: string[], headers: Object) => async (dispatch: any) => {
    try {
      const newMeal = await api.deleteMeal(checkedMeals, headers);
      checkedMeals.map((value) => {
        dispatch(deleteMeals(value));
      });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteMealbyId =
  (mealType: number, headers: Object) => async (dispatch: any) => {
    try {
      const del = await api.deleteMealbyId(mealType, headers);
      dispatch(deleteMealType(mealType));
    } catch (error) {
      console.log(error);
    }
  };

export const fetchChartData = async (startDate: Date, endDate: Date, headers: any) => {
  try {
    const nutrientsByDay : ChartData[] =  (await api.fetchChartData(startDate, endDate, headers)).data;
    let formatNutrients : ChartComponent[];
    
    const calories : LineChart[] = nutrientsByDay.map(o => {
      return { x: o["date"], y: o["calories"]} 
    });

    const protein: LineChart[] = nutrientsByDay.map(o => {
      return { x: o["date"], y: o["protein"]}
    });

    const carbs: LineChart[] = nutrientsByDay.map(o => {
      return {x: o["date"], y: o["carbs"]}
    });

    const fat: LineChart[] = nutrientsByDay.map(o => {
      return {x: o["date"], y: o["fat"] }
    });

    const sugar: LineChart[] = nutrientsByDay.map(o => {
      return {x: o["date"], y: o["sugar"],}
    });

    formatNutrients = [{name: "calories", lineChart: calories }];
    formatNutrients = [...formatNutrients, {name: "protein", lineChart: protein }];
    formatNutrients = [...formatNutrients, {name: "carbs", lineChart: carbs }];
    formatNutrients = [...formatNutrients, {name: "fat", lineChart: fat }];
    formatNutrients = [...formatNutrients, {name: "sugar", lineChart: sugar }];
    const dat = new Date();
    console.log(dat.toLocaleDateString())
   
   return formatNutrients;
  } catch (error) {
    console.log(error);
  }
};

export const createCopy =  (meals : string[], headers: any ) => async(dispatch : any) => {
  try {
    await api.createCopy(meals, headers);
  } catch (error) {
    console.log(error);
    
  }
}

export const getLastProducts = (headers: any) => async (dispatch: any) => {
  try {
    const meals = (await api.getLastProducts(headers)).data;
    dispatch(fetch(meals));
   
  } catch (error) {
    console.log(error);
  }
}
