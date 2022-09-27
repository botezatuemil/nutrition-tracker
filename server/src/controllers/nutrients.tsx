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
} from "../interfaces";
import { Nutrients } from "../interfaces";
const prisma = new PrismaClient();

export const fetchChartData = async (req: Request, res: Response) => {
  try {
    const startDate: Date = req.body.startDate;
    const endDate: Date = req.body.endDate;

    const nutrientsByDay = await prisma.$queryRaw<{day: Date, nutrients: Nutrients}[]>` 
    SELECT sum(nutrients.calories)::INTEGER as calories, 
    sum(nutrients.protein)::INTEGER as protein, 
    sum(nutrients.fat)::INTEGER as fat, 
    sum(nutrients.carbs)::INTEGER as carbs, 
    sum(nutrients.sugar)::INTEGER as sugar,  date.date
    FROM nutrients
    inner join meal on meal.nutrient_id = nutrients.id
    inner join meal_type on meal_type.id = meal.meal_type_id
    inner join journal on journal.id = meal_type.journal_id
    inner join date on date.id = journal.date_id
    WHERE date.date >= ${startDate}::DATE and date.date <= ${endDate}::DATE
    group by date.id`

    console.log(nutrientsByDay);
    res.send(nutrientsByDay)
  } catch (error) {
    console.log(error);
  }
};
