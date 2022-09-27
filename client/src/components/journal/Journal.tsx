import React, { useState, useEffect } from "react";
import { addMealJournal } from "../../actions/mealAction";
import { AllMeals, Meal, Nutrients, NutrientsRef } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import meal from "../../store/meal";
import { isAdded } from "../../store/wasAddedMeal";
import Navbar from "../nav/Navbar";
import DayTime from "./DayTime";
import Tracker from "./Tracker";

const Journal = () => {
  const meals = useAppSelector((state) => state.meal);

  const [mealsArr, setMealsArr] = useState<string[] | undefined>();
  const [nutrientsArr, setNutrientsArr] = useState<string[] | undefined>();
  const [id, setId] = useState<number>(0);
  const [hasMeal, setHasMeal] = useState<boolean>(false);
  
  const isAdded : boolean = useAppSelector(state => state.wasAddedMeal)
  console.log(isAdded);
  
  useEffect(() => {
    getMealIndex(id);
  }, [meals, isAdded])
  

  const getMealIndex = (id: number) => {
    
    if (meals !== undefined) {
    
      const selectedMealsType: AllMeals | undefined = meals.find(
        (meal) => meal.id === id
      );

      if (selectedMealsType?.meal) {
        const selectedMeals = selectedMealsType?.meal.split(":");
        const selectedNutrients = selectedMealsType?.nutrients.split(":");

        setMealsArr(selectedMeals);
        setNutrientsArr(selectedNutrients);
       
      } else {
        setMealsArr(undefined);
        setNutrientsArr(undefined);
      }
      setHasMeal(true);
      setId(id);
    }
  };

  return (
    <div className="flex w-[80vw] flex-col h-[100vh] overflow-hidden">
      <Navbar title="Journal" />
      <div className="flex flex-row h-full w-full ">
        <DayTime selectIndex={getMealIndex} setHasMeal={setHasMeal} />
        {hasMeal ? (
          <Tracker
          
            selectIndex={getMealIndex}
            index={id}
            meals={mealsArr}
            nutrients={nutrientsArr}
          />
        ) : (
          <p>no meals</p>
        )}
      </div>
    </div>
  );
};

export default Journal;
