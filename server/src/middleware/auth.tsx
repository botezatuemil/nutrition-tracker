import { JsonWebTokenError, Secret, sign, verify } from "jsonwebtoken";
import {Request, Response, NextFunction} from 'express';
import { User_Session } from "../interfaces";


export const verifyJWT = (req : Request, res : Response, next: NextFunction) => {

    const bearerToken : string | string[] | undefined = req.headers["x-access-token"];
    //const convert = bearerToken as string;
    //const token = convert.split(" ");

    if (!bearerToken) {
        res.send("Permission not authorized without token");
    } else {
       try {
        verify(bearerToken as string, process.env.TOKEN_KEY as string, (err, decoded) => {
            if (err) {
                console.log(err);
                res.send("Failed to authenticate");
            } else {
                res.locals.user_id = decoded; 
                next();
            }
        })
       } catch (error) {
           console.log(error);
       }
    }
}