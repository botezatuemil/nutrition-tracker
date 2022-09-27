import { Request, Response } from "express";
import { nutrients, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

import { sign } from "jsonwebtoken";
import { users, profile } from "@prisma/client";
import { verifyJWT } from "../middleware/auth";
import {
  User_Session,
  Profile,
  Nutrients,
  Activity,
  Goal,
} from "../interfaces";

declare module "express-session" {
  interface SessionData {
    user_id: number;
  }
}
export const register = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password } = req.body;
    const result: users[] = await prisma.$queryRaw<
      users[]
    >`SELECT * FROM users WHERE email = ${email}`;

    if (result.length !== 0) {
      res
        .status(202)
        .json("There is already an account with this email address");
      return;
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: {
        fullname,
        email,
        password: encryptedPassword,
      },
    });

    res.status(201).json("Account created succesfully");
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email);

    const result: users[] = await prisma.$queryRaw<
      users[]
    >`SELECT * FROM users WHERE email = ${email}`;

    if (result.length === 0) {
      res.status(201).json("Invalid credentials!");
      return;
    }

    if (await bcrypt.compare(password, result[0].password)) {
      const token = sign(
        { user_id: result[0].id },
        process.env.TOKEN_KEY as string
      );

      //req.session.user_id = result[0].id;
      // req.session.save();

      res.send(token);
    } else {
      res.status(202).json("Invalid credentials!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const calculateMacros = async (
  req: Request<{}, {}, { objects: Array<any> }, {}>,
  res: Response
) => {
  try {
    const user: User_Session = res.locals.user_id;

    const profileFront: Profile = req.body.objects[0];
    const nutrientsFront: Nutrients = req.body.objects[1];

    const profileDb: profile[] = await prisma.$queryRaw<
      profile[]
    >`SELECT * FROM profile, users WHERE profile.user_id = ${user.user_id}`;

    if (profileDb.length === 0) {
      const nutrientsId: [{ id: number }] = await prisma.$queryRaw<
        [{ id: number }]
      >`INSERT INTO nutrients (calories, protein, carbs, fat, sugar) VALUES (${nutrientsFront.calories}, ${nutrientsFront.protein}, ${nutrientsFront.carbs}, ${nutrientsFront.fat}, ${nutrientsFront.sugar}) RETURNING id`;

      const profileId: { id: number } = await prisma.$queryRaw<{
        id: number;
      }>`INSERT INTO profile (gender, weight, height, age, nutrients_id, user_id, goal, activity) VALUES (${
        profileFront.gender
      }, ${profileFront.weight}, ${profileFront.height}, ${profileFront.age}, ${
        nutrientsId[0].id
      }, ${user.user_id}, ${Goal[profileFront.goal]}::goal ,  ${
        Activity[profileFront.activity]
      }::activity) RETURNING id`;
    } else {
      const nutrientsId: [{ nutrients_id: number }] = await prisma.$queryRaw<
        [{ nutrients_id: number }]
      >`UPDATE profile SET gender = ${profileFront.gender}, weight = ${
        profileFront.weight
      }, height = ${profileFront.height}, age = ${profileFront.age}, goal = ${
        Goal[profileFront.goal]
      }::goal, activity = ${
        Activity[profileFront.activity]
      }::activity  WHERE user_id = ${user.user_id} RETURNING nutrients_id`;

      console.log(nutrientsId[0].nutrients_id);
      console.log(nutrientsFront);

      const profile: [{ id: number }] = await prisma.$queryRaw<
        [{ id: number }]
      >`UPDATE nutrients SET calories = ${nutrientsFront.calories}::integer, protein = ${nutrientsFront.protein}::integer, carbs =  ${nutrientsFront.carbs}::integer, fat = ${nutrientsFront.fat}::integer, sugar = ${nutrientsFront.sugar}::integer WHERE id = ${nutrientsId[0].nutrients_id} RETURNING id`;
      res.send(profile);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMacros = async (req: Request, res: Response) => {
  try {
    const user: User_Session = res.locals.user_id;
    const nutrientsUser: nutrients[] = await prisma.$queryRaw<
      nutrients[]
    >`SELECT calories, protein, carbs, fat, sugar FROM profile 
    INNER JOIN users on users.id = profile.user_id
    INNER JOIN nutrients on profile.nutrients_id = nutrients.id
    WHERE users.id = ${user.user_id}`;

    res.send(nutrientsUser);
  } catch (error) {}
};
