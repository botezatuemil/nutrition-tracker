import { Input } from "@chakra-ui/react";
import React, { SetStateAction, useRef, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { AllMeals, Meal, Nutrients, NutrientsRef } from "../../interfaces";
import { addMealJournal } from "../../actions/mealAction";
import { getHeader } from "../../utilities/Header";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as api from "../../api/routes";
import { add } from "../../store/mealTotal";
import { isAdded } from "../../store/wasAddedMeal";

const ModalMeal: React.FC<{
 
  selectIndex: (id: number) => void;
  index: number;
  title: string;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  const name = useRef<HTMLInputElement>(null);
  const amount = useRef<HTMLInputElement>(null);
  const kcal = useRef<HTMLInputElement>(null);
  const carbs = useRef<HTMLInputElement>(null);
  const protein = useRef<HTMLInputElement>(null);
  const sugar = useRef<HTMLInputElement>(null);
  const fat = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
 
  const addMeal = () => {
    const meal: Meal = {
      name: name.current?.value,
      amount: amount.current?.value,
      meal_type_id: props.index,
      nutrient_id: 1, //does not need now
    };

    const nutrients: NutrientsRef = {
      calories: kcal.current?.value,
      protein: protein.current?.value,
      sugar: sugar.current?.value,
      fat: fat.current?.value,
      carbs: carbs.current?.value,
    };

    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    const addToLast : boolean = true;

    dispatch(addMealJournal(meal, nutrients, headers, addToLast));
    if (
      kcal.current !== null &&
      carbs.current !== null &&
      fat.current !== null &&
      protein.current !== null &&
      sugar.current !== null &&
      amount.current !== null
    ) {
      const nutrientsToAdd : Nutrients = {
        calories : parseInt(kcal.current.value) * parseInt(amount.current?.value),
        protein : parseInt(protein.current.value) * parseInt(amount.current?.value),
        carbs : parseInt(carbs.current.value) * parseInt(amount.current?.value),
        fat: parseInt(fat.current.value) * parseInt(amount.current?.value),
        sugar: parseInt(sugar.current.value) * parseInt(amount.current?.value),
      }
      dispatch(add(nutrientsToAdd));
    }
    props.setShow(false);
  };

  return (
    <div className="absolute z-10 p-8  -translate-x-1/2 flex flex-col   -translate-y-1/2 left-1/2 top-1/2 backdrop-blur-md shadow-lg w-[40vw] rounded-xl bg-white h-[75vh]">
      <p className="font-semibold  text-lg font-jakarta ">{props.title}</p>
      <div className="flex flex-row items-center  mt-4 justify-between mr-[6vw]">
        <p className="font-jakarta ">Name</p>
        <Input ref={name} width={{ md: "25vw" }} type="text" />
      </div>
      <div className="flex flex-row items-center  mt-4 justify-between mr-[6vw]">
        <p className="font-jakarta ">Amount</p>
        <Input ref={amount} width={{ md: "25vw" }} type="number" />
      </div>
      <div className="flex flex-row items-center  mt-4 justify-between mr-[6vw]">
        <p className="font-jakarta ">Kcal</p>
        <Input ref={kcal} width={{ md: "25vw" }} type="number" />
      </div>
      <div className="flex flex-row items-center  mt-4 justify-between mr-[6vw]">
        <p className="font-jakarta ">Protein</p>
        <Input ref={protein} width={{ md: "25vw" }} type="number" />
      </div>
      <div className="flex flex-row items-center mt-4 justify-between mr-[6vw]">
        <p className="font-jakarta ">Carbs</p>
        <Input ref={carbs} width={{ md: "25vw" }} type="number" />
      </div>
      <div className="flex flex-row items-center justify-between mr-[6vw] mt-4">
        <p className="font-jakarta ">Fat</p>
        <Input ref={fat} width={{ md: "25vw" }} type="number" />
      </div>
      <div className="flex flex-row items-center justify-between mr-[6vw] mt-4">
        <p className="font-jakarta ">Sugar</p>
        <Input ref={sugar} width={{ md: "25vw" }} type="number" />
      </div>
      <div className="absolute bottom-0 right-0 flex flex-row space-x-2 pb-10 mr-10">
        <Button variant="ghost" onClick={() => props.setShow(false)}>
          Cancel
        </Button>
        <Button colorScheme="messenger" onClick={addMeal}>
          Save meal
        </Button>
      </div>
    </div>
  );
};

export default ModalMeal;
