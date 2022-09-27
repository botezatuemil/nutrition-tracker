import express from "express";
import { register, login, calculateMacros, getMacros } from '../controllers/users';
import {addJournal, getMeals, addMeal, deleteMeal, deleteMealbyId} from '../controllers/meal';
import {addRecipe, getAllRecipes, addMealTypeToRecipe, deleteRecipe} from '../controllers/recipe';
import {editWaterGoal, addWater, fetchWaterData} from '../controllers/water';
import {fetchChartData} from '../controllers/nutrients';
import { verifyJWT } from "../middleware/auth";
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/calculateMacros', verifyJWT, calculateMacros);
router.get('/getMacros', verifyJWT, getMacros);
router.post('/addJournal', verifyJWT, addJournal);
router.post('/getMealTypes', verifyJWT, getMeals);
router.post('/addMeal', verifyJWT, addMeal);
router.post('/deleteMeal', verifyJWT, deleteMeal);
router.post('/deleteMealType', verifyJWT, deleteMealbyId);
router.post('/addRecipe', verifyJWT, addRecipe);
router.get('/getAllRecipes', verifyJWT, getAllRecipes);
router.post('/addMealTypeToRecipe', verifyJWT, addMealTypeToRecipe);
router.post('/deleteRecipe', verifyJWT, deleteRecipe );
router.post('/fetchChartData', verifyJWT, fetchChartData);
router.post('/editWaterGoal', verifyJWT, editWaterGoal);
router.post('/addWater', verifyJWT, addWater);
router.post('/fetchWaterData', verifyJWT, fetchWaterData);
export default router;

