import { AxiosError, AxiosPromise } from "axios";
import * as api from "../api/routes";
import { User, Profile, Nutrients, DateTime, MealType } from "../interfaces";
import { useSelector, useDispatch } from 'react-redux'
import { update, fetchAll } from '../store/meal'
import { fetchMacros } from '../store/user'
import { AnyAction } from "@reduxjs/toolkit";
import { fetchUserName } from "../store/userName";


export const registerUser = async (user: User) => {
  try {
    const data = await api.registerUser(user);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
  }
};

export const loginUser = async (user: User) => {
  try {
    const  data  = await api.loginUser(user);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err);
  }
};

export const createUserProfile = async (profile : Profile, nutrients: Nutrients, headers : Object) => {
  try {
    const obj = await api.createProfile(profile, nutrients, headers);
    console.log(obj)
    
  } catch (error) {
    console.log(error);
  }
}

export const createJournal =  (mealType : MealType, date: DateTime, headers : Object) => async (dispatch: any) => {
  try {
    const meal = await api.addJournal(mealType, date, headers);
    console.log(meal);
    dispatch(update(meal));
    
    
  } catch (error) {
    console.log(error);
  }
}

export const getMacros = (headers: Object) => async (dispatch: any) => {

  try {
    const macros = await api.getMacros(headers);
    dispatch(fetchMacros(macros));
  } catch (error) {
    console.log(error);
  }
}

export const getName = (headers: any) => async (dispatch: any) => {
  try {
    const name =  (await api.getUserName(headers)).data;

    dispatch(fetchUserName(name));
  } catch(error) {
    console.log(error);
  }
} 
