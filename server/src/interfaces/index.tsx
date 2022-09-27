export interface User_Session {
  user_id: number;
}

export interface Profile {
  gender: boolean;
  weight: number;
  age: number;
  height: number;
  goal: Goal;
  activity: Activity;
}

export interface Nutrients {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
}

export interface NutrientsRef {
  //to change
  calories: string | undefined;
  protein: string | undefined;
  carbs: string | undefined;
  fat: string | undefined;
  sugar: string | undefined;
}

export interface Meal {
  name: string | undefined;
  meal_type_id: number | undefined;
  nutrient_id: number | undefined;
  amount: string | undefined;
}

export interface DateTimeDB {
  id: number;
  date: DateTime;
}

export interface Recipe {
  id: number;
  meal_id: number;
  user_id: number;
}

export interface RecipeShow {
  id: number;
  name: string | undefined;
  amount: number;
  nutrients: NutrientsRef;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
}
export interface WaterGoal {
  id: number;
  liters: number;
  user_id: number;
}
export interface AllMeals {
  id: number;
  hour: DateTime;
  type: Type;
  meal: string;
  nutrients: string;
}

export enum Goal {
  LOSE,
  MANTAIN,
  GAIN,
}

export enum Activity {
  SEDENTARY,
  MODERATE,
  ACTIVE,
}

export interface DateTime {
  date: Date;
}

export interface MealType {
  id: number;
  hour: Date;
  type: Type;
  journalId: number;
}

export enum Type {
  BREAKFAST,
  LUNCH,
  DINNER,
  FASTFOOD,
  SNACK,
  WATER,
}
// export const Goal : { [x: string]: 'LOSE' | 'MANTAIN' | 'GAIN'} = {
//   LOSE : 'LOSE',
//   MANTAIN: 'MANTAIN',
//   GAIN: 'GAIN',
// }
// export type Goal = typeof Goal[keyof typeof Goal]

// export const Activity: { [x: string]: 'SEDENTARY' | 'MODERATE' | 'ACTIVE'} = {
//   SEDENTARY: 'SEDENTARY',
//   MODERATE: 'MODERATE',
//   ACTIVE: 'ACTIVE'
// }
// export type Activity = typeof Activity[keyof typeof Activity]
