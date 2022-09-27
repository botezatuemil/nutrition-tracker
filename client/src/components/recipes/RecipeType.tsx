import React, {useState} from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useAppDispatch } from "../../store/hooks";
import {deleteRecipe} from  '../../actions/recipeAction';
const RecipeType: React.FC<{
  id: number;
  name: string  | undefined;
  amount: string | undefined;
  carbs: string | undefined;
  protein: string | undefined;
  kcal: string | undefined;
  fat: string | undefined;
  sugar: string | undefined;
}> = (props) => {

  const dispatch = useAppDispatch();

  const deleteRecipeHandler = () => {

    const headers = {
      "x-access-token": localStorage.getItem("token")!,
    };

    dispatch(deleteRecipe(props.id, headers));
  }

  return (
    <div className="flex w-full bg-white h-[10vh] rounded-lg mt-4 px-10 py-2 items-center justify-between">
      <div className="flex flex-col space-y-2 ">
        <div className="font-semibold jakarta text-lg">{props.name}</div>
        <div className="flex flex-row space-x-2">
          <div className="text-xs">{props.kcal} calories</div>
          <div className="text-xs">{props.protein} protein</div>
          <div className="text-xs">{props.fat} fat</div>
          <div className="text-xs">{props.sugar} sugar</div>
          <div className="text-xs">{props.carbs} carbs</div>
        </div>
      </div>
      <div className="flex flex-row space-x-2 items-center">
        <Button variant="outline" width="5vw" height="35px">
          Info
        </Button>

        <Button size="sm" onClick={deleteRecipeHandler}>-</Button>
        <p>3</p>
        <Button size="sm" backgroundColor="#35BB89" color="white">
          +
        </Button>
      </div>

     
    </div>
  );
};

export default RecipeType;
