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
  WaterGoal,
} from "../interfaces";

const prisma = new PrismaClient();

export const editWaterGoal = async (req: Request, res: Response) => {
  try {
    let liters: number = req.body.liters;
    const user: User_Session = res.locals.user_id;

    const data = await prisma.$queryRaw<
      { liters: number }[]
    >`SELECT water_goal.liters FROM water_goal where water_goal.user_id = ${user.user_id}`;
    if (data.length === 0) {
      await prisma.$queryRaw`INSERT INTO water_goal (liters, user_id) VALUES (${liters}, ${user.user_id})`;
    } else {
      await prisma.$queryRaw`UPDATE water_goal SET liters = ${liters}`;
    }

    res.send("Added water goal succesfully");
  } catch (error) {
    console.log(error);
  }
};

export const addWater = async (req: Request, res: Response) => {
  try {
    let liters: number = req.body.liters;
    const date: Date = req.body.date;
    const user: User_Session = res.locals.user_id;

    const dateDb: DateTimeDB[] = await prisma.$queryRaw<
    DateTimeDB[]
    >`SELECT date.id FROM date WHERE date.date = ${date}::DATE`;

    console.log(dateDb);

    let journalId: [{ id: number }];

    if (dateDb.length === 0) {
      const dateId: [{ id: number }] = await prisma.$queryRaw<
        [{ id: number }]
      >`INSERT INTO date (date) VALUES (${date}::DATE) RETURNING id`;

      journalId = await prisma.$queryRaw<
        [{ id: number }]
      >`INSERT INTO journal (date_id, user_id) VALUES (${dateId[0].id}, ${user.user_id}) RETURNING id`;
    } else {
      journalId = await prisma.$queryRaw<
        [{ id: number }]
      >`SELECT journal.id from journal, date WHERE journal.date_id = ${dateDb[0].id} AND user_id = ${user.user_id} `;
    }

    const data = await prisma.$queryRaw<
      { amount: number }[]
    >`Select water.amount from water where water.journal_id = ${journalId[0].id}`;

    let newAmount;
    if (data.length === 0) {
      await prisma.$queryRaw`insert into water (journal_id, amount) values (${journalId[0].id}, ${liters})`;
      newAmount = liters;
    } else {
      newAmount = data[0].amount + liters;
      await prisma.$queryRaw`update water set amount = ${newAmount} where water.journal_id = ${journalId[0].id}`;
    }
    res.send({ newAmount });
  } catch (error) {
    console.log(error);
  }
};

export const fetchWaterData = async (req: Request, res: Response) => {
  try {
    const startDate: Date = req.body.startDate;
    const endDate: Date = req.body.endDate;

    const waterByDay = await prisma.$queryRaw<{x: Date; y: number }[]>` 
    SELECT  date.date as x, water.amount as y FROM water
    inner join journal on journal.id = water.journal_id
    inner join date on date.id  = journal.date_id
    WHERE date.date >= ${startDate}::DATE and date.date <= ${endDate}::DATE`;

    console.log(waterByDay);
    res.send(waterByDay);
  } catch (error) {
    console.log(error);
  }
};

export const getWaterGoal = async (req: Request, res: Response) => {
  try {
    const user: User_Session = res.locals.user_id;
    const goal = await prisma.$queryRaw<{liters: number}[]>`select water_goal.liters from water_goal where water_goal.user_id = ${user.user_id}`;
    console.log(goal[0].liters);
    res.send(goal[0]);
  } catch (error) {
    console.log(error);
  }
}

export const getWater = async (req: Request, res: Response) => {
  try {

    const date: string = new Date().toDateString();
    const user: User_Session = res.locals.user_id;

    const dateDb: DateTimeDB[] = await prisma.$queryRaw<
    DateTimeDB[]
    >`SELECT date.id FROM date WHERE date.date = ${date}::DATE`;

    const journalId = await prisma.$queryRaw<
        [{ id: number }]
      >`SELECT journal.id from journal, date WHERE journal.date_id = ${dateDb[0].id} AND user_id = ${user.user_id} `;
    

    const data = await prisma.$queryRaw<
      { amount: number }[]
    >`Select water.amount from water where water.journal_id = ${journalId[0].id}`;
   
    res.send(data[0]);
  } catch (error) {
    console.log(error);
  }
}
