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

const prisma = new PrismaClient();

export const addJournal = async (
  req: Request<{}, {}, { objects: Array<any> }, {}>,
  res: Response
) => {
  try {
    const user: User_Session = res.locals.user_id;

    const datetime: DateTime = req.body.objects[0];
    const mealTypeFront: MealType = req.body.objects[1];

    const date = datetime.date;

    const dateDb: DateTimeDB[] = await prisma.$queryRaw<
      DateTimeDB[]
    >`SELECT date.id FROM date WHERE date.date = ${date}::date`;

    console.log(dateDb);

    let journalId: [{ id: number }];

    if (dateDb.length === 0) {
      const dateId: [{ id: number }] = await prisma.$queryRaw<
        [{ id: number }]
      >`INSERT INTO date (date) VALUES (${date}::date) RETURNING id`;

      journalId = await prisma.$queryRaw<
        [{ id: number }]
      >`INSERT INTO journal (date_id, user_id) VALUES (${dateId[0].id}, ${user.user_id}) RETURNING id`;
    } else {
      journalId = await prisma.$queryRaw<
        [{ id: number }]
      >`SELECT journal.id from journal, date WHERE journal.date_id = ${dateDb[0].id} AND user_id = ${user.user_id} `;
    }

    const meal_type = await prisma.$queryRaw<
      [{ id: number }]
    >`INSERT INTO meal_type (hour, journal_id, type) VALUES (${
      mealTypeFront.hour
    }::timestamp, ${journalId[0].id}, ${
      Type[mealTypeFront.type]
    }::type) RETURNING id`;

    const addedMeal : AllMeals[] =
      await prisma.$queryRaw<AllMeals[]>`SELECT meal_type.id, meal_type.hour, meal_type.type, meal::varchar, nutrients::varchar from meal_type
    left join meal on meal.meal_type_id = meal_type.id
    left join nutrients on nutrients.id= meal.nutrient_id
    where meal_type.id = ${meal_type[0].id}`;

    res.send(addedMeal[0])

    // if (addedMeal[0].meal === null) {
    //   const newMeals = {...addedMeal[0], meal: "", nutrients: ""};
    //   console.log(newMeals)
    //   res.send(newMeals);
      
    //   //console.log(newMeals);
    // }
    // else {
    //   res.send(addedMeal[0]);
    // }
    
  } catch (error) {
    console.log(error);
  }
};

export const getMeals = async (req: Request, res: Response) => {
  try {
    const date: DateTime = req.body;
    const user: User_Session = res.locals.user_id;

    const meals: AllMeals[] = await prisma.$queryRaw<AllMeals[]>`
    select meal_type.id, meal_type.hour, meal_type.type, string_agg(meal::varchar, ':') as meal, string_agg(nutrients::varchar, ':') as nutrients
    from journal 
    inner join users on users.id = journal.user_id and users.id = ${user.user_id}
    inner join meal_type on journal.id = meal_type.journal_id
    left join meal on meal_type.id = meal.meal_type_id
    left join nutrients on nutrients.id = meal.nutrient_id
    where journal.date_id in (select date.id from date where date.date = ${date.date}::date)
    group by meal_type.id`;

    res.send(meals);
  } catch (error) {
    console.log(error);
  }
};

export const addMeal = async (
  req: Request<{}, {}, { objects: Array<any> }, {}>,
  res: Response
) => {
  try {
    const mealFront: Meal = req.body.objects[0];
    const nutrientsFront: NutrientsRef = req.body.objects[1];

    const nutrient_id = await prisma.$queryRaw<
      [{ id: number }]
    >`INSERT INTO nutrients (calories, protein, carbs, fat, sugar) VALUES (${nutrientsFront.calories}::INTEGER, ${nutrientsFront.protein}::INTEGER, ${nutrientsFront.carbs}::INTEGER, ${nutrientsFront.fat}::INTEGER, ${nutrientsFront.sugar}::INTEGER) RETURNING id`;
    console.log(nutrient_id);

    const meal_id = await prisma.$queryRaw<
      [{ id: number }]
    >`INSERT INTO meal (name, meal_type_id, nutrient_id, amount) VALUES (${mealFront.name}, ${mealFront.meal_type_id}, ${nutrient_id[0].id}, ${mealFront.amount}::INTEGER) RETURNING id`;

    const newMeal =
      await prisma.$queryRaw<AllMeals[]>`SELECT meal_type.id, meal_type.hour, meal_type.type, meal::varchar, nutrients::varchar from meal_type
    left join meal on meal.meal_type_id = meal_type.id
    left join nutrients on nutrients.id = meal.nutrient_id
    where meal.id = ${meal_id[0].id}`;

    console.log(newMeal);
    res.send(newMeal[0]);

    
  } catch (error) {
    console.log(error);
  }
};

export const deleteMealDatabase = async(id: string) => {
  await prisma.$queryRaw`DELETE FROM meal where meal.id = ${id}::INTEGER`; //to test on liner
}

export const deleteMeal = async (req: Request, res: Response) => { //nu mai umbla aici!
  try {

    const meals : string[] = req.body;

    meals.map(value => {
      const splitted = value.split(/[(,)]/);
      deleteMealDatabase(splitted[1]);
    })

    res.send("The meals were deleted");

  } catch (error) {
    console.log(error)
  }
}

export const deleteMealbyId = async (req: Request, res: Response) => {
  try {
    
    const id : number = req.body.id;
    await prisma.$queryRaw`DELETE FROM meal_type WHERE meal_type.id = ${id}::INTEGER`;

    res.send("The meal was deleted");

  } catch (error) {
    console.log(error)
  }
}

export const createCopy = async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    console.log(error);
  }
}

export const getLastProducts = async (req: Request, res: Response) => {
  try {
    const lastProducts  = await prisma.$queryRaw<AllMeals[]>`
    select meal_type.id,  meal_type.hour,  meal_type.type, meal::varchar, nutrients::varchar
    from meal_type
    inner join meal on meal.meal_type_id = meal_type.id
    inner join nutrients on nutrients.id = meal.nutrient_id
    order by meal_type.id desc limit 5
    `

    res.send(lastProducts);
  } catch (error) {
    console.log(error);
  }
}
