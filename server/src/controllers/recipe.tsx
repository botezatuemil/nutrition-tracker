import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { resolve } from "node:path/win32";
import {
  User_Session,
  DateTime,
  MealType,
  Type,
  AllMeals,
  DateTimeDB,
  Meal,
  NutrientsRef,
  Recipe,
  RecipeShow,
} from "../interfaces";

const prisma = new PrismaClient();

export const addRecipe = async (req: Request, res: Response) => {
  try {
    const user: User_Session = res.locals.user_id;

    const nutrientsFront: NutrientsRef = req.body.objects[0];
    const mealFront: Meal = req.body.objects[1];

    const nutrient_id = await prisma.$queryRaw<
      [{ id: number }]
    >`INSERT INTO nutrients (calories, protein, carbs, fat, sugar) VALUES (${nutrientsFront.calories}::INTEGER, ${nutrientsFront.protein}::INTEGER, ${nutrientsFront.carbs}::INTEGER, ${nutrientsFront.fat}::INTEGER, ${nutrientsFront.sugar}::INTEGER) RETURNING id`;
    console.log(nutrient_id);

    const meal_id = await prisma.$queryRaw<
      [{ id: number }]
    >`INSERT INTO meal (name, nutrient_id, amount) VALUES (${mealFront.name}, ${nutrient_id[0].id}, ${mealFront.amount}::INTEGER) RETURNING id`;

    const recipeId = await prisma.$queryRaw<
      [{ id: number }]
    >`INSERT INTO recipe (meal_id, user_id) VALUES (${meal_id[0].id},  ${user.user_id}::INTEGER) returning id`;

    res.send(recipeId[0]);
  } catch (error) {
    console.log(error);
  }
};

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await prisma.$queryRaw<RecipeShow[]>`
    select recipe.id, meal.name, meal.amount, nutrients.calories,nutrients.carbs, nutrients.fat, nutrients.sugar, nutrients.protein from recipe
    inner join meal on meal.id = recipe.meal_id
    inner join nutrients on nutrients.id = meal.nutrient_id`;
    console.log(recipes); //*even if i have an object within an object the data comes destructured

    res.send(recipes);
  } catch (error) {
    console.log(error);
  }
};

export const addMealTypeToRecipe = async (req: Request, res: Response) => {
  try {
    const meal_type_id = req.body.objects[0];
    const id = req.body.objects[1];

    const meal_id = await prisma.$queryRaw<
    [{ meal_id: number }]
  >`select recipe.meal_id from recipe where recipe.id = ${id}`;

    const recipeUpdated = await prisma.$queryRaw`update meal set meal_type_id = ${meal_type_id} where id = ${meal_id[0].meal_id}`;

    const recipe = await prisma.$queryRaw<{meal: string, nutrients: string}[]>`SELECT meal::varchar, nutrients::varchar from recipe
    inner join meal on recipe.meal_id = meal.id
    inner join nutrients on nutrients.id = meal.nutrient_id
    where recipe.id = ${id};
    `
    console.log(recipe[0]);
    res.send(recipe[0]);

  } catch (error) {
    console.log(error);
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  
  try {
    const id: number = req.body.id;
    const deletedRecipe = await prisma.$queryRaw`delete from recipe where recipe.id = ${id}`;

    res.send("Recipe was deleted");
  } catch (error) {
    console.log(error);
  }
}

export const helper = async(mealSplitted : string[], user_id : number) => {
  await prisma.$queryRaw`INSERT into recipe (meal_id, user_id) values (${mealSplitted[1]}::INTEGER, ${user_id})`
}

export const mealToRecipe = async (req: Request, res: Response) => {
  try {
    const meals: string[] = req.body.meals;
    const user : User_Session = res.locals.user_id;
    meals.map(value => {
      const mealSplitted = value.split(/[(,)]/);
      console.log(mealSplitted);
      helper(mealSplitted, user.user_id);
    })

    res.send("Meals added succesfully");
    
  } catch (error) {
    console.log(error);
  }
}
