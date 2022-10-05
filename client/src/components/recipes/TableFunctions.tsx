import React, { useState } from "react";
import { RecipeShow } from "../../interfaces";
import { useAppDispatch } from "../../store/hooks";
import { update } from "../../store/recipe";

const TableFunctions: React.FC<{ recipes: RecipeShow[] }> = (props) => {
  const dispatch = useAppDispatch();
  let sortVar: number = 1;

  const sortByCalories = () => {
    const sortedRecipe = [...props.recipes];
    sortedRecipe.sort((a, b) => {
      if (a.calories !== undefined && b.calories !== undefined) {
        if (a.calories < b.calories) {
          return sortVar;
        } else {
          return sortVar;
        }
      } else {
        return 0;
      }
    });

    dispatch(update(sortedRecipe));
    sortVar *= -1;
  };
  return (
    <div className="w-full flex-row flex justify-between mt-4">
      <p className="font-semibold text-sm "> {props.recipes.length} meals</p>
      <div className="flex flex-row space-x-4">
        <p
          className="font-semibold text-sm cursor-pointer"
          onClick={sortByCalories}
        >
          Sort by calories
        </p>
      </div>
    </div>
  );
};

export default TableFunctions;
