import React, { useState, useEffect } from "react";
import HeaderTable from "./HeaderTable";
import { MealTable, Nutrients } from "../../interfaces";
import MealRow from "./MealRow";
import Footer from "./Footer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { add, initialize } from "../../store/mealTotal";
import { addChecked, clearSelectedMeals } from "../../store/checkedMeals";

import {
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Alert,
} from "@chakra-ui/react";

const MealTracker: React.FC<{
  meals: string[] | undefined;
  nutrients: string[] | undefined;
  index: number;
}> = (props) => {
  const dispatch = useAppDispatch();
  const nutrients: Nutrients = useAppSelector((state) => state.mealTotal);
  const dailyNutrients: Nutrients = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(initialize());
    dispatch(clearSelectedMeals());

    props.nutrients?.map((value, idx) => {
      const splitNutrients = value.split(/[(,)]/);

      if (props.meals !== undefined) {

        const splittedMeals = props.meals[idx].split(/[(,)]/);
        console.log(splittedMeals[4]);
        
        const nutrients: Nutrients = {
          calories: parseInt(splitNutrients[2]) * parseInt(splittedMeals[4]),
          protein: parseInt(splitNutrients[3]) * parseInt(splittedMeals[4]),
          carbs: parseInt(splitNutrients[4]) * parseInt(splittedMeals[4]),
          fat: parseInt(splitNutrients[5]) * parseInt(splittedMeals[4]),
          sugar: parseInt(splitNutrients[6]) * parseInt(splittedMeals[4]),
        };
        dispatch(add(nutrients));
      }
    });
  }, [props.index]);

  return (
    <div className="flex h-full w-full justify-center ">
      <div className="flex flex-col w-[55vw]">
        <HeaderTable />
        <div className="space-y-1 overflow-auto h-[40vh]">
          {props.meals !== undefined ? (
            props.meals?.map((value: string, index) => {
              const meals = value.split(/[(,)]/);
              let nutrients: string | undefined;
              props.nutrients?.map((value, index) => {
                const nutrientArr = value.split(/[(,)]/);

                if (
                  nutrientArr[1] === meals[3] &&
                  props.nutrients !== undefined
                ) {
                  nutrients = props.nutrients[index];
                }
              });
              return (
                <MealRow
                  mealUnsplitted={value}
                  valueMeals={meals}
                  valueNutrients={nutrients}
                />
              );
            })
          ) : (
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="100%"
            >
              <div className="space-y-2 flex flex-col items-center">
                <AlertIcon boxSize="40px" mr={0} />
                <p className="font-jakarta font-bold text-xl">
                  No meals added!
                </p>
                <p className="font-jakarta">
                  To add a new meal press the top right button{" "}
                </p>
              </div>
            </Alert>
          )}
        </div>
        <div className="space-y-1 mt-6">
          <Footer
            text="text-black"
            name="Totals"
            nutrients={{
              fat: nutrients.fat,
              sugar: nutrients.sugar,
              protein: nutrients.protein,
              carbs: nutrients.carbs,
              calories: nutrients.calories,
            }}
          />
          <Footer
            text="text-[#4B7DFA]"
            name="Your daily goal"
            nutrients={{
              fat: dailyNutrients.fat,
              sugar: dailyNutrients.sugar,
              protein: dailyNutrients.protein,
              carbs: dailyNutrients.carbs,
              calories: dailyNutrients.calories,
            }}
          />
        </div>
        <div className="flex mt-6">
          <Footer
            text="text-[#9E6E6D]"
            name="Remaining"
            nutrients={{
              fat: dailyNutrients.fat - nutrients.fat,
              sugar: dailyNutrients.sugar - nutrients.sugar,
              protein: dailyNutrients.protein - nutrients.protein,
              carbs: dailyNutrients.carbs - nutrients.carbs,
              calories: dailyNutrients.calories - nutrients.calories,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MealTracker;
